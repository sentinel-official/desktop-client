package account

import (
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/models"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerGetAccount(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		address, err := sdk.AccAddressFromHex(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		account, err := ctx.Client().QueryAccount(address)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 2, err.Error())
			return
		}

		item := models.NewAccountFromRaw(account)
		utils.WriteResultToResponse(w, 200, item)
	}
}
