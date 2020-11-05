package gov

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/messages"
	"github.com/sentinel-official/desktop-client/cli/models"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerGetProposals(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		proposals, err := ctx.Client().QueryProposals()
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 1, err.Error())
			return
		}

		items := models.NewProposalsFromRaw(proposals)
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerGetDeposits(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		deposits, err := ctx.Client().QueryDeposits(id)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 2, err.Error())
			return
		}

		items := models.NewDepositsFromRaw(deposits)
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerGetVotes(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		votes, err := ctx.Client().QueryVotes(id)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 2, err.Error())
			return
		}

		items := models.NewVotesFromRaw(votes)
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerVote(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestVote(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 3, err.Error())
			return
		}

		msg, err := messages.NewProposalVote(ctx.AddressHex(), id, body.Option).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 4, err.Error())
			return
		}

		if err := msg.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, 400, 5, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, msg)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 6, err.Error())
			return
		}

		utils.WriteResultToResponse(w, 200, res)
	}
}
