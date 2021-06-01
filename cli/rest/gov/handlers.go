package gov

import (
	"net/http"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/gov"
)

func HandlerGetProposals(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		res, err := ctx.Client().QueryProposals()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		items := gov.NewProposalsFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerGetVote(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		address, err := sdk.AccAddressFromBech32(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}
		if !ctx.Client().FromAddress().Equals(address) {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, "")
			return
		}

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		res, err := ctx.Client().QueryProposalVote(id, address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
			return
		}

		item := gov.NewVoteFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerVote(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		body, err := NewRequestVote(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1003, err.Error())
			return
		}

		var (
			option, _ = govtypes.VoteOptionFromString(body.Option)
			message   = govtypes.NewMsgVote(
				ctx.Client().FromAddress(),
				id,
				option,
			)
		)

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1004, err.Error())
			return
		}

		res, err := ctx.Client().BroadcastTx(body.Memo, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1005, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
