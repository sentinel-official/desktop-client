package login

import (
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerLogin(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		utils.WriteResultToResponse(w, 200, nil)
	}
}
