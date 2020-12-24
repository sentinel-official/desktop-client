package session

import (
	"bytes"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"net/url"
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
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		result, err := ctx.Client().QuerySession(id)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 2, err.Error())
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
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		vars := mux.Vars(r)

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		result, err := ctx.Client().QuerySessionsForAddress(address, skip, limit)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
			return
		}

		items := session.NewSessionsFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerAddSession(ctx *context.Context) http.HandlerFunc {
	var (
		client = http.Client{
			Timeout: 5 * time.Second,
		}
	)

	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestAddSession(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		var (
			vars     = mux.Vars(r)
			endpoint = fmt.Sprintf("%s/sessions", body.RemoteURL)
		)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 3, err.Error())
			return
		}

		privateKey, err := wgt.NewPrivateKey()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
			return
		}

		request, err := json.Marshal(
			map[string]interface{}{
				"id":      id,
				"key":     privateKey.Public().String(),
				"address": ctx.AddressHex(),
			},
		)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, err.Error())
			return
		}

		resp, err := client.Post(endpoint, "application/json", bytes.NewBuffer(request))
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 6, err.Error())
			return
		}

		defer func() {
			_ = resp.Body.Close()
		}()

		var response types.Response
		if err := json.NewDecoder(resp.Body).Decode(&request); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 7, err.Error())
			return
		}

		result, err := base64.StdEncoding.DecodeString(response.Result.(string))
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 8, err.Error())
			return
		}

		var (
			v4Addr    = net.IP(result[0:4])
			v6Addr    = net.IP(result[4:20])
			dnsAddr   = net.IP(result[20:24])
			publicKey = wgt.NewKey(result[24:])
		)

		listenPort, err := utils.GetFreeUDPPort()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 9, err.Error())
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
				DNS:        []net.IP{dnsAddr},
			},
			Peers: []wgt.Peer{
				{
					PublicKey: *publicKey,
					AllowedIPs: []wgt.IPNet{
						{net.ParseIP("0.0.0.0"), 0},
						{net.ParseIP("::"), 0},
					},
					Endpoint: wgt.Endpoint{
						Host: body.Host,
						Port: body.Port,
					},
				},
			},
		}

		wg := wireguard.NewWireGuard().
			WithConfig(cfg).
			WithConfigDir(types.DefaultHomeDirectory)

		if err := wg.Initialize(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 10, err.Error())
			return
		}

		if err := wg.Start(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 11, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
