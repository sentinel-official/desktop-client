package node

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	hubtypes "github.com/sentinel-official/hub/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/node"
)

func HandlerGetNode(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		address, err := hubtypes.NodeAddressFromBech32(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryNode(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		item := node.NewNodeFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetNodes(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			values = r.URL.Query()
			status = hubtypes.StatusFromString(values.Get("status"))
		)

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryNodes(status, pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		items := node.NewNodesFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}

func HandlerGetNodesForPlan(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			values = r.URL.Query()
			vars   = mux.Vars(r)
		)

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		plan, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		res, err := ctx.Client().QueryNodesForPlan(plan, pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		items := node.NewNodesFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}
