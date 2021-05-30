package subscription

import (
	"net/http"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"
	hubtypes "github.com/sentinel-official/hub/types"
	subscriptiontypes "github.com/sentinel-official/hub/x/subscription/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/subscription"
)

func HandlerGetSubscription(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QuerySubscription(id)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		item := subscription.NewSubscriptionFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetSubscriptionsForAddress(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			values = r.URL.Query()
			vars   = mux.Vars(r)
			status = hubtypes.StatusFromString(values.Get("status"))
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

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		res, err := ctx.Client().QuerySubscriptionsForAddress(address, status, pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		items := subscription.NewSubscriptionsFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerAddSubscription(ctx *context.Context) http.HandlerFunc {
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

		body, err := NewRequestAddSubscription(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}

		var (
			message sdk.Msg
			from    = ctx.Client().FromAddress()
		)

		if body.ID == 0 {
			var (
				to, _   = hubtypes.NodeAddressFromBech32(body.To)
				coin, _ = sdk.ParseCoinNormalized(body.Coin)
			)

			message = subscriptiontypes.NewMsgSubscribeToNodeRequest(
				from,
				to,
				coin,
			)
		} else {
			message = subscriptiontypes.NewMsgSubscribeToPlanRequest(
				from,
				body.ID,
				body.Denom,
			)
		}

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

func HandlerCancelSubscription(ctx *context.Context) http.HandlerFunc {
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

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		body, err := NewRequestCancelSubscription(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1005, err.Error())
			return
		}

		var (
			message = subscriptiontypes.NewMsgCancelRequest(
				ctx.Client().FromAddress(),
				id,
			)
		)

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1006, err.Error())
			return
		}

		res, err := ctx.Client().BroadcastTx(body.Memo, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1007, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerGetQuota(ctx *context.Context) http.HandlerFunc {
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

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		res, err := ctx.Client().QueryQuota(id, address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		item := subscription.NewQuotaFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetQuotas(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars   = mux.Vars(r)
			values = r.URL.Query()
		)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		res, err := ctx.Client().QueryQuotas(id, pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		items := subscription.NewQuotasFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}
