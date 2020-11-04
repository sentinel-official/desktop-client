package cmd

import (
	"log"
	"net/http"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/spf13/cobra"

	"github.com/sentinel-official/desktop-client/cli/handlers/config"
	"github.com/sentinel-official/desktop-client/cli/handlers/keys"
	"github.com/sentinel-official/desktop-client/cli/handlers/login"
	"github.com/sentinel-official/desktop-client/cli/middlewares"
	"github.com/sentinel-official/desktop-client/cli/types"
)

func ServerCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "server",
		Short: "Start REST API server",
		RunE: func(cmd *cobra.Command, args []string) error {
			home, err := cmd.Flags().GetString(types.FlagHome)
			if err != nil {
				return err
			}

			listenOn, err := cmd.Flags().GetString(flagListenOn)
			if err != nil {
				return err
			}

			var (
				cfgFile     = filepath.Join(home, "config.toml")
				buildFolder = filepath.Join(home, "build")
			)

			cfg := types.NewConfig()
			if err := cfg.LoadFromPath(cfgFile); err != nil {
				return err
			}
			if err := cfg.Validate(); err != nil {
				return err
			}

			var (
				muxRouter         = mux.NewRouter()
				protectedRouter   = muxRouter.PathPrefix("/api/v1").Subrouter()
				unprotectedRouter = muxRouter.PathPrefix("/api/v1").Subrouter()
			)

			muxRouter.Use(middlewares.Log)
			muxRouter.PathPrefix("/").
				Handler(http.FileServer(http.Dir(buildFolder)))

			unprotectedRouter.Use(middlewares.AddHeaders)
			login.RegisterRoutes(unprotectedRouter, cfg)

			protectedRouter.Use(middlewares.AddHeaders)
			protectedRouter.Use(middlewares.TokenVerify)
			config.RegisterRoutes(protectedRouter, cfg)
			keys.RegisterRoutes(protectedRouter, cfg)

			corsRouter := cors.New(cors.Options{
				AllowedMethods: []string{
					http.MethodGet,
					http.MethodDelete,
					http.MethodPost,
					http.MethodPut,
				},
			}).Handler(muxRouter)

			log.Printf("Listening on %s\n", listenOn)
			return http.ListenAndServe(listenOn, corsRouter)
		},
	}

	cmd.Flags().String(flagListenOn, "127.0.0.1:8080", "address to listen on")
	return cmd
}
