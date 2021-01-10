package subscription

import (
	"encoding/hex"
	"net/http"
	"net/url"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"
	hub "github.com/sentinel-official/hub/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/subscription"
)

func HandlerGetSubscription(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		result, err := ctx.Client().QuerySubscription(id)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 2, err.Error())
			return
		}

		items := subscription.NewSubscriptionFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func parseQuery(query url.Values) (status hub.Status, skip, limit int, err error) {
	skip = 0
	if query.Get("skip") != "" {
		skip, err = strconv.Atoi(query.Get("skip"))
		if err != nil {
			return status, 0, 0, err
		}
	}

	limit = 25
	if query.Get("limit") != "" {
		limit, err = strconv.Atoi(query.Get("limit"))
		if err != nil {
			return status, 0, 0, err
		}
	}

	if query.Get("status") != "" {
		status = hub.StatusFromString(query.Get("status"))
	}

	return status, skip, limit, nil
}

func HandlerGetSubscriptionsForAddress(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		status, skip, limit, err := parseQuery(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		vars := mux.Vars(r)

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		result, err := ctx.Client().QuerySubscriptionsForAddress(address, status, skip, limit)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
			return
		}

		items := subscription.NewSubscriptionsFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerAddSubscription(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestAddSubscription(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		var message sdk.Msg
		if body.ID == 0 {
			message, err = subscription.NewMsgSubscribeToNode(ctx.AddressHex(), body.To, body.Amount).Raw()
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
				return
			}
		} else {
			message, err = subscription.NewMsgSubscribeToPlan(ctx.AddressHex(), body.ID, body.Denom).Raw()
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
				return
			}
		}

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 4, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerCancelSubscription(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestCancelSubscription(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		id, err := strconv.ParseUint(mux.Vars(r)["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 3, err.Error())
			return
		}

		message, err := subscription.NewMsgCancel(ctx.AddressHex(), id).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
			return
		}

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 5, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 6, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}

func HandlerGetQuota(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		result, err := ctx.Client().QueryQuota(id, address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
			return
		}

		items := subscription.NewQuotaFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerGetQuotas(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		_, skip, limit, err := parseQuery(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		result, err := ctx.Client().QueryQuotas(id, skip, limit)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
			return
		}

		items := subscription.NewQuotasFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}
