package subscription

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetSubscription").
		Methods(http.MethodGet).Path("/subscriptions/{id}").
		HandlerFunc(HandlerGetSubscription(ctx))
	r.Name("GetSubscriptionsForAddress").
		Methods(http.MethodGet).Path("/accounts/{address}/subscriptions").
		HandlerFunc(HandlerGetSubscriptionsForAddress(ctx))

	r.Name("AddSubscription").
		Methods(http.MethodPost).Path("/accounts/{address}/subscriptions").
		HandlerFunc(HandlerAddSubscription(ctx))
	r.Name("CancelSubscription").
		Methods(http.MethodPost).Path("/accounts/{address}/subscriptions/{id}/cancel").
		HandlerFunc(HandlerCancelSubscription(ctx))

	r.Name("GetQuota").
		Methods(http.MethodGet).Path("/subscriptions/{id}/quotas/{address}").
		HandlerFunc(HandlerGetQuota(ctx))
	r.Name("GetQuotas").
		Methods(http.MethodGet).Path("/subscriptions/{id}/quotas").
		HandlerFunc(HandlerGetQuotas(ctx))
}
