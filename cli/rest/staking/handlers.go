package staking

import (
	"net/http"
	"net/url"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/models"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func ParseQueryGetValidators(query url.Values) (page, limit int, status string, err error) {
	page = 1
	if query.Get("page") != "" {
		page, err = strconv.Atoi(query.Get("page"))
		if err != nil {
			return 0, 0, "", err
		}
	}

	limit = 25
	if query.Get("limit") != "" {
		limit, err = strconv.Atoi(query.Get("limit"))
		if err != nil {
			return 0, 0, "", err
		}
	}

	status = sdk.BondStatusBonded
	if query.Get("status") != "" {
		status = query.Get("status")
	}

	return page, limit, status, nil
}

func HandlerGetValidators(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		page, limit, status, err := ParseQueryGetValidators(r.URL.Query())
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		validators, err := ctx.Client().QueryValidators(page, limit, status)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		items := models.NewValidatorsFromRaw(validators)
		utils.WriteResultToResponse(w, 200, items)
	}
}

func HandlerGetValidator(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)

		address, err := sdk.ValAddressFromHex(vars["address"])
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		validator, err := ctx.Client().QueryValidator(address)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		item := models.NewValidatorFromRaw(validator)
		utils.WriteResultToResponse(w, 200, item)
	}
}
