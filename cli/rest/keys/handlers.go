package keys

import (
	"net/http"

	"github.com/cosmos/cosmos-sdk/crypto/keys"
	"github.com/cosmos/go-bip39"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/other"
)

func HandlerGetKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		info, err := ctx.Client().Keybase().Get(vars["name"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		item := other.NewKeyFromRaw(info, "")
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetKeys(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		infos, err := ctx.Client().Keybase().List()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		items := other.NewKeysFromRaw(infos, make([]string, len(infos)))
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerAddKey(ctx *context.Context) http.HandlerFunc {
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

		info, _ := ctx.Client().Keybase().Get(body.Name)
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

		info, err = ctx.Client().Keybase().CreateAccount(body.Name, body.Mnemonic, body.BIP39Password, body.Password,
			keys.CreateHDPath(0, 0).String(), keys.Secp256k1)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		item := other.NewKeyFromRaw(info, body.Mnemonic)
		utils.WriteResultToResponse(w, http.StatusCreated, item)
	}
}

func HandlerDeleteKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestDeleteKey(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		vars := mux.Vars(r)

		if err := ctx.Client().Keybase().Delete(vars["name"], body.Password, false); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
