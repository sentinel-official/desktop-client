package node

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetNode").
		Methods(http.MethodGet).Path("/nodes/{address}").
		HandlerFunc(HandlerGetNode(ctx))
	r.Name("GetNodes").
		Methods(http.MethodGet).Path("/nodes").
		HandlerFunc(HandlerGetNodes(ctx))
	r.Name("GetNodesForPlan").
		Methods(http.MethodGet).Path("/plans/{id}/nodes").
		HandlerFunc(HandlerGetNodesForPlan(ctx))
}
