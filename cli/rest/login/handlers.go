package login

import (
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerLogin(_ *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
