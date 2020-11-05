package bank

import (
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/messages"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerSend(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestSend(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		msg, err := messages.NewSend(ctx.AddressHex(), body.ToAddress, body.Amount).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 3, err.Error())
			return
		}

		if err := msg.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, 400, 4, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, msg)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 5, err.Error())
			return
		}

		utils.WriteResultToResponse(w, 200, res)
	}
}
