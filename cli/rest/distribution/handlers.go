package distribution

import (
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"

	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerWithdrawRewards(ctx *context.Context) http.HandlerFunc {
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

		body, err := NewRequestWithdrawRewards(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}

		messages := make([]sdk.Msg, 0, len(body.Validators))
		for _, address := range body.Validators {
			var (
				validator, _ = sdk.ValAddressFromBech32(address)
				message      = distributiontypes.NewMsgWithdrawDelegatorReward(
					ctx.Client().FromAddress(),
					validator,
				)
			)

			if err := message.ValidateBasic(); err != nil {
				utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
				return
			}

			messages = append(messages, message)
		}

		res, err := ctx.Client().BroadcastTx(body.Memo, messages...)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
