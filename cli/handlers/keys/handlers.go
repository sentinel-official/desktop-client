package keys

import (
	"net/http"

	"github.com/cosmos/go-bip39"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/models"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerGetKeys(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		infos, err := ctx.Client().Keybase().List()
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 2, err.Error())
			return
		}

		items := models.NewKeysFromRaw(infos, make([]string, len(infos)))
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerGetKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		info, err := ctx.Client().Keybase().Get(vars["name"])
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 2, err.Error())
			return
		}

		item := models.NewKeyFromRaw(info, "")
		utils.WriteResultToResponse(w, 200, item)
	}
}

func HandlerAddKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestAddKey(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err = body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		info, _ := ctx.Client().Keybase().Get(body.Name)
		if info != nil {
			utils.WriteErrorToResponse(w, 400, 4, "duplicate key name")
			return
		}

		if body.Mnemonic == "" {
			entropy, err := bip39.NewEntropy(256)
			if err != nil {
				utils.WriteErrorToResponse(w, 400, 5, err.Error())
				return
			}

			body.Mnemonic, err = bip39.NewMnemonic(entropy)
			if err != nil {
				utils.WriteErrorToResponse(w, 400, 6, err.Error())
				return
			}
		}

		info, err = ctx.Client().Keybase().CreateAccount(body.Name, body.Mnemonic, body.BIP39Password, body.Password, 0, 0)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 7, err.Error())
			return
		}

		item := models.NewKeyFromRaw(info, body.Mnemonic)
		utils.WriteResultToResponse(w, 201, item)
	}
}

func HandlerDeleteKey(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestDeleteKey(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err = body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		if err = ctx.Client().Keybase().Delete(body.Name, body.Password, false); err != nil {
			utils.WriteErrorToResponse(w, 500, 4, err.Error())
			return
		}

		utils.WriteResultToResponse(w, 200, nil)
	}
}
