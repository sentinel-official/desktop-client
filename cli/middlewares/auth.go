package middlewares

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func TokenVerify(ctx *context.Context) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if ctx.Token() != r.Header.Get("Authorization") {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, -1, "token mismatch")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
