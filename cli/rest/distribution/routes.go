package distribution

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("WithdrawRewards").
		Methods(http.MethodPost).Path("/delegators/{address}/rewards").
		HandlerFunc(HandlerWithdrawRewards(ctx))
}
