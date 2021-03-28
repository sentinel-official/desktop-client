package deposit

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetDeposit").
		Methods(http.MethodGet).Path("/accounts/{address}/deposits").
		HandlerFunc(HandlerGetDeposit(ctx))
}
