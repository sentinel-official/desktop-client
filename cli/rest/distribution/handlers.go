package distribution

import (
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/messages"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerWithdrawRewards(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestWithdrawRewards(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		var msgs []sdk.Msg
		for _, validator := range body.Validators {
			msg, err := messages.NewWithdrawRewards(ctx.AddressHex(), validator).Raw()
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
				return
			}

			if err := msg.ValidateBasic(); err != nil {
				utils.WriteErrorToResponse(w, http.StatusBadRequest, 4, err.Error())
				return
			}

			msgs = append(msgs, msg)
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, msgs...)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
