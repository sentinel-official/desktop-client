package login

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/types"
)

func RegisterRoutes(r *mux.Router, cfg *types.Config) {
	r.Name("Login").
		Methods(http.MethodPost).Path("/login").
		HandlerFunc(HandlerAuthenticate(cfg))
}
