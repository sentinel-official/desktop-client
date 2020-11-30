package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerLogin(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestLogin(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		auth := r.Header.Get("Authorization")
		if auth == "" {
			password := fmt.Sprintf("%X", sha256.Sum256([]byte(body.Password)))
			if password != ctx.Config().Password {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 3, "")
				return
			}
		} else {
			if len(auth) < 7 || !strings.EqualFold(auth[:7], "Bearer ") {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 4, "")
				return
			}

			token := ctx.AuthToken()
			if token == nil || token.Value != auth[7:] {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 4, "")
				return
			}
			if time.Now().After(token.Expiry) {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 4, "")
				return
			}
		}

		bytes := make([]byte, 32)

		_, err = rand.Read(bytes)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, "")
			return
		}

		ctx.WithAuthToken(&types.AuthToken{
			Value:  fmt.Sprintf("%X", bytes),
			Expiry: time.Now().Add(15 * time.Minute),
		})

		utils.WriteResultToResponse(w, http.StatusOK, ctx.AuthToken())
	}
}
