package bank

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
)

func RegisterRoutes(r *mux.Router, ctx *context.Context) {
	r.Name("Send").
		Methods(http.MethodPost).Path("/bank/send").
		HandlerFunc(HandlerSend(ctx))
}
