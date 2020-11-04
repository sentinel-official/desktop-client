package config

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/types"
)

func RegisterRoutes(r *mux.Router, cfg *types.Config) {
	r.Name("GetConfig").
		Methods(http.MethodGet).Path("/config").
		HandlerFunc(HandlerGetConfig(cfg))
	r.Name("UpdateConfig").
		Methods(http.MethodPut).Path("/config").
		HandlerFunc(HandlerUpdateConfig(cfg))
}
