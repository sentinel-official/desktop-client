package keys

import (
	"net/http"

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
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1, err.Error())
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
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1, err.Error())
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
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		info, _ := ctx.Client().Keybase().Get(body.Name)
		if info != nil {
			utils.WriteErrorToResponse(w, http.StatusConflict, 3, "key already exists")
			return
		}

		if body.Mnemonic == "" {
			entropy, err := bip39.NewEntropy(256)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
				return
			}

			body.Mnemonic, err = bip39.NewMnemonic(entropy)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, err.Error())
				return
			}
		}

		info, err = ctx.Client().Keybase().CreateAccount(body.Name, body.Mnemonic, body.BIP39Password, body.Password, 0, 0)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 6, err.Error())
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
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		vars := mux.Vars(r)

		if err := ctx.Client().Keybase().Delete(vars["name"], body.Password, false); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
