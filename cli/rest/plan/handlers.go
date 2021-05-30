package plan

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	hubtypes "github.com/sentinel-official/hub/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/plan"
)

func HandlerGetPlan(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		id, err := strconv.ParseUint(vars["id"], 10, 64)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryPlan(id)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		item := plan.NewPlanFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetPlansForProvider(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			values = r.URL.Query()
			vars   = mux.Vars(r)
			status = hubtypes.StatusFromString(values.Get("status"))
		)

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		address, err := hubtypes.ProvAddressFromBech32(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		res, err := ctx.Client().QueryPlansForProvider(address, status, pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		items := plan.NewPlansFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}
