package staking

import (
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/staking"
)

func HandlerGetValidator(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		address, err := sdk.ValAddressFromBech32(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryValidator(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		item := staking.NewValidatorFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetValidators(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			values = r.URL.Query()
			status = values.Get("status")
		)

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryValidators(status, pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		items := staking.NewValidatorsFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerGetDelegations(ctx *context.Context) http.HandlerFunc {
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

		res, err := ctx.Client().QueryDelegations(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		items := staking.NewDelegationsFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerDelegate(ctx *context.Context) http.HandlerFunc {
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

		body, err := NewRequestDelegate(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}

		var (
			to, _   = sdk.ValAddressFromBech32(body.To)
			coin, _ = sdk.ParseCoinNormalized(body.Coin)
			message = stakingtypes.NewMsgDelegate(
				ctx.Client().FromAddress(),
				to,
				coin,
			)
		)

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		res, err := ctx.Client().BroadcastTx(body.Memo, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerRedelegate(ctx *context.Context) http.HandlerFunc {
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

		body, err := NewRequestRedelegate(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}

		var (
			from, _ = sdk.ValAddressFromBech32(body.From)
			to, _   = sdk.ValAddressFromBech32(body.To)
			coin, _ = sdk.ParseCoinNormalized(body.Coin)
			message = stakingtypes.NewMsgBeginRedelegate(
				ctx.Client().FromAddress(),
				from,
				to,
				coin,
			)
		)

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		res, err := ctx.Client().BroadcastTx(body.Memo, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerUndelegate(ctx *context.Context) http.HandlerFunc {
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

		body, err := NewRequestUnbond(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}

		var (
			from, _ = sdk.ValAddressFromBech32(body.From)
			coin, _ = sdk.ParseCoinNormalized(body.Coin)
			message = stakingtypes.NewMsgUndelegate(
				ctx.Client().FromAddress(),
				from,
				coin,
			)
		)

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		res, err := ctx.Client().BroadcastTx(body.Memo, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1006, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
