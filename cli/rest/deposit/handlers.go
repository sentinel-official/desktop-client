package deposit

import (
	"encoding/hex"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/other"
)

func HandlerGetDeposit(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		result, err := ctx.Client().QueryDeposit(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 2, err.Error())
			return
		}

		item := other.NewDepositFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}
