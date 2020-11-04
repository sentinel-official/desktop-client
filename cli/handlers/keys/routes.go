package keys

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/types"
)

func RegisterRoutes(r *mux.Router, cfg *types.Config) {
	r.Name("GetKeys").
		Methods(http.MethodGet).Path("/keys").
		HandlerFunc(HandlerGetKeys(cfg))
	r.Name("GetKey").
		Methods(http.MethodGet).Path("/keys/{name}").
		HandlerFunc(HandlerGetKey(cfg))
	r.Name("AddKey").
		Methods(http.MethodPost).Path("/keys").
		HandlerFunc(HandlerAddKey(cfg))
	r.Name("DeleteKey").
		Methods(http.MethodDelete).Path("/keys/{name}").
		HandlerFunc(HandlerDeleteKey(cfg))
}
