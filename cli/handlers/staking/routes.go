package staking

import (
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetValidators").
		Methods("GET").Path("/validators").
		HandlerFunc(HandlerGetValidators(ctx))
	r.Name("GetValidator").
		Methods("GET").Path("/validators/{address}").
		HandlerFunc(HandlerGetValidator(ctx))
}
