package session

import (
	"bytes"
	"crypto/tls"
	"encoding/base64"
	"encoding/binary"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"net/url"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/services/wireguard"
	wgt "github.com/sentinel-official/desktop-client/cli/services/wireguard/types"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/session"
)

func HandlerGetSession(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		result, err := ctx.Client().QuerySession(id)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		items := session.NewSessionFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func parseQuery(query url.Values) (skip, limit int, err error) {
	skip = 0
	if query.Get("skip") != "" {
		skip, err = strconv.Atoi(query.Get("skip"))
		if err != nil {
			return 0, 0, err
		}
	}

	limit = 25
	if query.Get("limit") != "" {
		limit, err = strconv.Atoi(query.Get("limit"))
		if err != nil {
			return 0, 0, err
		}
	}

	return skip, limit, nil
}

func HandlerGetSessionsForAddress(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		skip, limit, err := parseQuery(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		vars := mux.Vars(r)

		if ctx.Client().FromAddressHex() != vars["address"] {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, "")
			return
		}

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		result, err := ctx.Client().QuerySessionsForAddress(address, skip, limit)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		items := session.NewSessionsFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerStartSession(ctx *context.Context) http.HandlerFunc {
	var (
		client = http.Client{
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{
					InsecureSkipVerify: true,
				},
			},
			Timeout: 5 * time.Second,
		}
	)

	return func(w http.ResponseWriter, r *http.Request) {
		service := ctx.Service()
		if service != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, "")
			return
		}

		vars := mux.Vars(r)

		if ctx.Client().FromAddressHex() != vars["address"] {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, "")
			return
		}

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		body, err := NewRequestAddSession(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		to, err := hex.DecodeString(body.To)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1006, err.Error())
			return
		}

		node, err := ctx.Client().QueryNode(to)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1007, err.Error())
			return
		}
		if node.Address == nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1008, "")
			return
		}

		privateKey, err := wgt.NewPrivateKey()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1009, err.Error())
			return
		}

		request, err := json.Marshal(
			map[string]interface{}{
				"key": privateKey.Public().String(),
			},
		)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1010, err.Error())
			return
		}

		endpoint := fmt.Sprintf("%s/accounts/%s/subscriptions/%d/sessions", node.RemoteURL, ctx.AddressHex(), id)

		resp, err := client.Post(endpoint, "application/json", bytes.NewBuffer(request))
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1011, err.Error())
			return
		}

		defer func() {
			_ = resp.Body.Close()
		}()

		var response types.Response
		if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1012, err.Error())
			return
		}
		if !response.Success || response.Error != nil {
			utils.WriteErrorToResponse(w, resp.StatusCode, 1013, response.Error.Message)
			return
		}

		result, err := base64.StdEncoding.DecodeString(response.Result.(string))
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1014, err.Error())
			return
		}
		if len(result) != 58 {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1015, "")
			return
		}

		var (
			v4Addr, v6Addr = net.IP(result[0:4]), net.IP(result[4:20])
			host, port     = net.IP(result[20:24]), binary.BigEndian.Uint16(result[24:26])
			publicKey      = wgt.NewKey(result[26:58])
		)

		listenPort, err := utils.GetFreeUDPPort()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1016, err.Error())
			return
		}

		cfg := &wgt.Config{
			Name: wgt.DefaultInterface,
			Interface: wgt.Interface{
				Addresses: []wgt.IPNet{
					{v4Addr, 32},
					{v6Addr, 128},
				},
				ListenPort: listenPort,
				PrivateKey: *privateKey,
				DNS: []net.IP{
					net.ParseIP("10.8.0.1"),
				},
			},
			Peers: []wgt.Peer{
				{
					PublicKey: *publicKey,
					AllowedIPs: []wgt.IPNet{
						{net.ParseIP("0.0.0.0"), 0},
						{net.ParseIP("::"), 0},
					},
					Endpoint: wgt.Endpoint{
						Host: host.String(),
						Port: port,
					},
					PersistentKeepalive: 15,
				},
			},
		}

		status := types.NewStatus().
			WithFrom(ctx.Client().FromAddressHex()).
			WithID(id).
			WithName(cfg.Name).
			WithTo(body.To)

		info, err := json.Marshal(status)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1017, err.Error())
			return
		}

		service = wireguard.NewWireGuard().
			WithConfig(cfg).
			WithConfigDir(ctx.Home()).
			WithInfo(info)

		if err := service.PreUp(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1018, err.Error())
			return
		}
		if err := service.Up(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1019, err.Error())
			return
		}
		if err := service.PostUp(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1020, err.Error())
			return
		}

		if err := status.SaveToPath(filepath.Join(ctx.Home(), "status.json")); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1021, err.Error())
			return
		}

		ctx = ctx.WithService(service)
		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
