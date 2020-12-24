package distribution

import (
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/distribution"
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

		messages := make([]sdk.Msg, 0, len(body.Validators))
		for _, validator := range body.Validators {
			message, err := distribution.NewMsgWithdrawDelegatorReward(ctx.AddressHex(), validator).Raw()
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
				return
			}

			if err := message.ValidateBasic(); err != nil {
				utils.WriteErrorToResponse(w, http.StatusBadRequest, 4, err.Error())
				return
			}

			messages = append(messages, message)
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, messages...)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
