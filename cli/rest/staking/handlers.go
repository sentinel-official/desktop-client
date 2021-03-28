package staking

import (
	"encoding/hex"
	"math"
	"net/http"
	"net/url"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/staking"
)

func HandlerGetValidator(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		validator, err := ctx.Client().QueryValidator(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		item := staking.NewValidatorFromRaw(validator)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func parseQuery(query url.Values) (page, limit int, status string, err error) {
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

	if query.Get("status") != "" {
		status = query.Get("status")
	}

	return page, limit, status, nil
}

func HandlerGetValidators(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, status, err := parseQuery(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		var (
			page  = 1
			limit = math.MaxInt64
			items staking.Validators
		)

		if status == "" {
			bonded, err := ctx.Client().QueryValidators(page, limit, sdk.BondStatusBonded)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
				return
			}

			unbonding, err := ctx.Client().QueryValidators(page, limit, sdk.BondStatusUnbonding)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
				return
			}

			unbonded, err := ctx.Client().QueryValidators(page, limit, sdk.BondStatusUnbonded)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
				return
			}

			items = append(items, staking.NewValidatorsFromRaw(bonded)...)
			items = append(items, staking.NewValidatorsFromRaw(unbonding)...)
			items = append(items, staking.NewValidatorsFromRaw(unbonded)...)
		} else {
			result, err := ctx.Client().QueryValidators(page, limit, status)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
				return
			}

			items = append(items, staking.NewValidatorsFromRaw(result)...)
		}

		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerGetDelegations(ctx *context.Context) http.HandlerFunc {
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

		result, err := ctx.Client().QueryDelegations(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		items := staking.NewDelegationsFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerDelegate(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		if ctx.Client().FromAddressHex() != vars["address"] {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, "")
			return
		}

		body, err := NewRequestDelegate(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		message, err := staking.NewMsgDelegate(ctx.AddressHex(), body.To, body.Amount).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerRedelegate(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		if ctx.Client().FromAddressHex() != vars["address"] {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, "")
			return
		}

		body, err := NewRequestRedelegate(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		message, err := staking.NewMsgBeginRedelegate(ctx.AddressHex(), body.From, body.To, body.Amount).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerUndelegate(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		if ctx.Client().FromAddressHex() != vars["address"] {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, "")
			return
		}

		body, err := NewRequestUnbond(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		message, err := staking.NewMsgUndelegate(ctx.AddressHex(), body.From, body.Amount).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
