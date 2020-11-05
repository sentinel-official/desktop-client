package gov

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("GetProposals").
		Methods(http.MethodGet).Path("/proposals").
		HandlerFunc(HandlerGetProposals(ctx))
	r.Name("Vote").
		Methods(http.MethodPost).Path("/proposals/{id}/vote").
		HandlerFunc(HandlerVote(ctx))
	r.Name("GetDeposits").
		Methods(http.MethodGet).Path("/proposals/{id}/deposits").
		HandlerFunc(HandlerGetDeposits(ctx))
	r.Name("GetVotes").
		Methods(http.MethodGet).Path("/proposals/{id}/votes").
		HandlerFunc(HandlerGetVotes(ctx))
}
