package middlewares

import (
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/mux"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func TokenVerify(ctx *context.Context) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			auth := r.Header.Get("Authorization")
			if len(auth) < 7 || !strings.EqualFold(auth[:7], "Bearer ") {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, -1, "")
				return
			}

			token := ctx.AuthToken()
			if token == nil || token.Value != auth[7:] {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, -1, "")
				return
			}
			if time.Now().After(token.Expiry) {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, -1, "")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
