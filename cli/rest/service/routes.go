package service

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("ServiceDisconnect").
		Methods(http.MethodPost).Path("/service/disconnect").
		HandlerFunc(HandlerDisconnect(ctx))
	r.Name("ServiceStatus").
		Methods(http.MethodGet).Path("/service/status").
		HandlerFunc(HandlerStatus(ctx))
}
