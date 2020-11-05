package staking

import (
	"net/http"
	"net/url"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/messages"
	"github.com/sentinel-official/desktop-client/cli/models"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func ParseQueryGetValidators(query url.Values) (page, limit int, status string, err error) {
	page = 1
	if query.Get("page") != "" {
		page, err = strconv.Atoi(query.Get("page"))
		if err != nil {
			return 0, 0, "", err
		}
	}

	limit = 25
	if query.Get("limit") != "" {
		limit, err = strconv.Atoi(query.Get("limit"))
		if err != nil {
			return 0, 0, "", err
		}
	}

	status = sdk.BondStatusBonded
	if query.Get("status") != "" {
		status = query.Get("status")
	}

	return page, limit, status, nil
}

func HandlerGetValidators(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		page, limit, status, err := ParseQueryGetValidators(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		validators, err := ctx.Client().QueryValidators(page, limit, status)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		items := models.NewValidatorsFromRaw(validators)
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerGetValidator(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		address, err := sdk.ValAddressFromHex(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		validator, err := ctx.Client().QueryValidator(address)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		item := models.NewValidatorFromRaw(validator)
		utils.WriteResultToResponse(w, 200, item)
	}
}

func HandlerGetDelegations(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		address, err := sdk.AccAddressFromHex(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		delegations, err := ctx.Client().QueryDelegations(address)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		items := models.NewDelegationsFromRaw(delegations)
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerDelegate(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestDelegate(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		msg, err := messages.NewDelegate(ctx.AddressHex(), body.To, body.Amount).Raw()
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

func HandlerRedelegate(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestRedelegate(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		msg, err := messages.NewReDelegate(ctx.AddressHex(), body.From, body.To, body.Amount).Raw()
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

func HandlerUnbond(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestUnbond(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		msg, err := messages.NewUnbond(ctx.AddressHex(), body.From, body.Amount).Raw()
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
