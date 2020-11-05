package login

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("Login").
		Methods(http.MethodPost).Path("/login").
		HandlerFunc(HandlerLogin(ctx))
}
