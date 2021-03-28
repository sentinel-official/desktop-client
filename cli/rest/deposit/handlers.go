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

		if ctx.Client().FromAddressHex() != vars["address"] {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, "")
			return
		}

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		result, err := ctx.Client().QueryDeposit(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		item := other.NewDepositFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}
