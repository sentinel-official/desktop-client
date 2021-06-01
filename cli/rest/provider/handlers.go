package provider

import (
	"net/http"

	"github.com/gorilla/mux"
	hubtypes "github.com/sentinel-official/hub/types"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/provider"
)

func HandlerGetProvider(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			vars = mux.Vars(r)
		)

		address, err := hubtypes.ProvAddressFromBech32(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryProvider(address)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		item := provider.NewProviderFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, item)
	}
}

func HandlerGetProviders(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var (
			values = r.URL.Query()
		)

		pagination, err := utils.ParsePaginationQuery(values)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
			return
		}

		res, err := ctx.Client().QueryProviders(pagination)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		items := provider.NewProvidersFromRaw(res)
		utils.WriteResultToResponse(w, http.StatusOK, items)
	}
}
