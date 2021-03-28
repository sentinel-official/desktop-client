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
	r.Name("GetVote").
		Methods(http.MethodGet).Path("/proposals/{id}/votes/{address}").
		HandlerFunc(HandlerGetVote(ctx))
	r.Name("Vote").
		Methods(http.MethodPost).Path("/proposals/{id}/votes").
		HandlerFunc(HandlerVote(ctx))
}
