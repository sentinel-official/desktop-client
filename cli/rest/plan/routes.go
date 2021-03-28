package plan

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetPlan").
		Methods(http.MethodGet).Path("/plans/{id}").
		HandlerFunc(HandlerGetPlan(ctx))
	r.Name("GetPlansForProvider").
		Methods(http.MethodGet).Path("/providers/{address}/plans").
		HandlerFunc(HandlerGetPlansForProvider(ctx))
}
