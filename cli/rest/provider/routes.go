package provider

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetProvider").
		Methods(http.MethodGet).Path("/providers/{address}").
		HandlerFunc(HandlerGetProvider(ctx))
	r.Name("GetProviders").
		Methods(http.MethodGet).Path("/providers").
		HandlerFunc(HandlerGetProviders(ctx))
}
