package service

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
	"github.com/sentinel-official/desktop-client/cli/x/other"
)

func HandlerStatus(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		service := ctx.Service()
		if service == nil {
			utils.WriteResultToResponse(w, http.StatusOK, nil)
			return
		}

		info := service.Info()
		if info == nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, "")
			return
		}

		var status types.Status
		if err := json.Unmarshal(info, &status); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
			return
		}

		upload, download, err := service.Transfer()
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
			return
		}

		utils.WriteResultToResponse(w, http.StatusOK, ResponseStatus{
			Bandwidth: other.Bandwidth{
				Upload:   upload,
				Download: download,
			},
			From: status.From,
			ID:   status.ID,
			To:   status.To,
		})
	}
}

func HandlerDisconnect(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		service := ctx.Service()
		if service != nil {
			if err := service.PreDown(); err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1001, err.Error())
				return
			}
			if err := service.Down(); err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1002, err.Error())
				return
			}
			if err := service.PostDown(); err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
				return
			}
		}

		path := filepath.Join(ctx.Home(), "status.json")
		if _, err := os.Stat(path); err == nil {
			if err = os.Remove(path); err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}
		}

		ctx = ctx.WithService(nil)
		utils.WriteResultToResponse(w, http.StatusOK, nil)
	}
}
