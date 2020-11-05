package staking

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetValidators").
		Methods(http.MethodGet).Path("/validators").
		HandlerFunc(HandlerGetValidators(ctx))
	r.Name("GetValidator").
		Methods(http.MethodGet).Path("/validators/{address}").
		HandlerFunc(HandlerGetValidator(ctx))

	r.Name("GetDelegations").
		Methods(http.MethodGet).Path("/delegators/{address}/delegations").
		HandlerFunc(HandlerGetDelegations(ctx))
	r.Name("Delegate").
		Methods(http.MethodPost).Path("/delegators/{address}/delegations").
		HandlerFunc(HandlerDelegate(ctx))
	r.Name("Redelegate").
		Methods(http.MethodPost).Path("/delegators/{address}/delegations/redelegate").
		HandlerFunc(HandlerRedelegate(ctx))
	r.Name("Unbond").
		Methods(http.MethodPost).Path("/delegators/{address}/delegations/unbond").
		HandlerFunc(HandlerUnbond(ctx))
}
