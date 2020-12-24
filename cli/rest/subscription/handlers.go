package subscription

import (
	"encoding/hex"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"

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

func parseQuery(query url.Values) (skip, limit int, err error) {
	skip = 0
	if query.Get("skip") != "" {
		skip, err = strconv.Atoi(query.Get("skip"))
		if err != nil {
			return 0, 0, err
		}
	}

	limit = 25
	if query.Get("limit") != "" {
		limit, err = strconv.Atoi(query.Get("limit"))
		if err != nil {
			return 0, 0, err
		}
	}

	return skip, limit, nil
}

func HandlerGetSubscriptionsForAddress(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		skip, limit, err := parseQuery(r.URL.Query())
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

		result, err := ctx.Client().QuerySubscriptionsForAddress(address, skip, limit)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
			return
		}

		items := subscription.NewSubscriptionsFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, items)
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

		skip, limit, err := parseQuery(r.URL.Query())
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
