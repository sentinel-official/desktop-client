package login

import (
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerAuthenticate(_ *types.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		utils.WriteResultToResponse(w, 200, nil)
	}
}
