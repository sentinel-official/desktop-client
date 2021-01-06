package gov

import (
	"encoding/hex"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/gov"
)

func HandlerGetProposals(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		result, err := ctx.Client().QueryProposals()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1, err.Error())
			return
		}

		_ = gov.NewProposalsFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, DummyProposals)
	}
}

func HandlerGetVote(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		address, err := hex.DecodeString(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		result, err := ctx.Client().QueryProposalVote(id, address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 2, err.Error())
			return
		}

		item := gov.NewVoteFromRaw(result)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerVote(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestVote(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		vars := mux.Vars(r)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 3, err.Error())
			return
		}

		message, err := gov.NewMsgVote(ctx.AddressHex(), id, body.Option).Raw()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
			return
		}

		if err := message.ValidateBasic(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 5, err.Error())
			return
		}

		res, err := ctx.Client().Tx(body.Memo, body.Password, message)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 6, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, res)
	}
}
