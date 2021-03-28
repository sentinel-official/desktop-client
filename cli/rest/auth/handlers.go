package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"net/http"
	"time"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerLogin(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestLogin(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		if body.Token == "" {
			password := fmt.Sprintf("%X", sha256.Sum256([]byte(body.Password)))
			if password != ctx.Config().Password {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 1003, "password does not match")
				return
			}

			var (
				access  = make([]byte, 32)
				refresh = make([]byte, 32)
			)

			_, err = rand.Read(access)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			_, err = rand.Read(refresh)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			ctx.WithAuthToken(&types.AuthToken{
				Refresh: types.Token{
					Value:  fmt.Sprintf("%X", refresh),
					Expiry: time.Now().Add(30 * time.Minute),
				},
				Access: types.Token{
					Value:  fmt.Sprintf("%X", access),
					Expiry: time.Now().Add(1 * time.Minute),
				},
			})
		} else {
			if ctx.AuthToken() == nil {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 1004, "token does not exist")
				return
			}

			refresh := ctx.AuthToken().Refresh
			if body.Token != refresh.Value {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 1004, "token does not match")
				return
			}
			if time.Now().After(refresh.Expiry) {
				utils.WriteErrorToResponse(w, http.StatusUnauthorized, 1004, "token expired")
				return
			}

			bytes := make([]byte, 32)

			_, err = rand.Read(bytes)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1005, err.Error())
				return
			}

			ctx.WithAuthToken(&types.AuthToken{
				Refresh: refresh,
				Access: types.Token{
					Value:  fmt.Sprintf("%X", bytes),
					Expiry: time.Now().Add(1 * time.Minute),
				},
			})
		}

		utils.WriteResultToResponse(w, http.StatusOK, ctx.AuthToken())
	}
}
