package account

import (
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/auth"
	"github.com/sentinel-official/desktop-client/cli/x/common"
)

func HandlerGetAccount(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		address, err := sdk.AccAddressFromBech32(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}
		if !ctx.Client().FromAddress().Equals(address) {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, "")
			return
		}

		account, err := ctx.Client().QueryAccount(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		denom := r.URL.Query().Get("denom")
		if denom == "" {
			denom = types.Denom
		}

		balance, err := ctx.Client().QueryBalance(address, denom)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		item := auth.NewAccountFromRaw(account).
			WithBalance(common.NewCoinFromRaw(balance))
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}
