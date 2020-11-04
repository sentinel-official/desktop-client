package config

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetConfig").
		Methods(http.MethodGet).Path("/config").
		HandlerFunc(HandlerGetConfig(ctx))
	r.Name("UpdateConfig").
		Methods(http.MethodPut).Path("/config").
		HandlerFunc(HandlerUpdateConfig(ctx))
}
