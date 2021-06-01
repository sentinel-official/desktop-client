package keys

import (
	"net/http"

	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/go-bip39"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/common"
)

func HandlerGetKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		info, err := ctx.Client().Keyring().Key(vars["name"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		item := common.NewKeyFromRaw(info, "")
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetKeys(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		infos, err := ctx.Client().Keyring().List()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		items := common.NewKeysFromRaw(infos, nil)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerAddKey(ctx *context.Context) http.HandlerFunc {
	var (
		path          = hd.CreateHDPath(sdk.GetConfig().GetCoinType(), 0, 0)
		algorithms, _ = ctx.Client().Keyring().SupportedAlgorithms()
	)

	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestAddKey(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		info, _ := ctx.Client().Keyring().Key(body.Name)
		if info != nil {
			utils.WriteErrorToResponse(w, http.StatusConflict, 1003, "key already exists")
			return
		}

		if body.Mnemonic == "" {
			entropy, err := bip39.NewEntropy(256)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			body.Mnemonic, err = bip39.NewMnemonic(entropy)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1005, err.Error())
				return
			}
		}

		algorithm, err := keyring.NewSigningAlgoFromString(string(hd.Secp256k1Type), algorithms)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		info, err = ctx.Client().Keyring().NewAccount(body.Name, body.Mnemonic, body.BIP39Password, path.String(), algorithm)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1007, err.Error())
			return
		}

		item := common.NewKeyFromRaw(info, body.Mnemonic)
		utils.WriteResultToResponse(w, http.StatusCreated, item)
	}
}

func HandlerDeleteKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		if err := ctx.Client().Keyring().Delete(vars["name"]); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
