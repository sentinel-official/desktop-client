package cmd

import (
	"log"
	"net/http"
	"path/filepath"

	clientutils "github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/sentinel-official/hub"
	"github.com/spf13/cobra"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/lite"
	"github.com/sentinel-official/desktop-client/cli/middlewares"
	"github.com/sentinel-official/desktop-client/cli/rest/account"
	"github.com/sentinel-official/desktop-client/cli/rest/bank"
	"github.com/sentinel-official/desktop-client/cli/rest/config"
	"github.com/sentinel-official/desktop-client/cli/rest/distribution"
	"github.com/sentinel-official/desktop-client/cli/rest/gov"
	"github.com/sentinel-official/desktop-client/cli/rest/keys"
	"github.com/sentinel-official/desktop-client/cli/rest/auth"
	"github.com/sentinel-official/desktop-client/cli/rest/staking"
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

			cdc := hub.MakeCodec()

			client, err := lite.NewClientFromConfig(cfg)
			if err != nil {
				return err
			}

			client.WithCodec(cdc).
				WithTxEncoder(clientutils.GetTxEncoder(cdc))

			ctx := context.NewContext().
				WithHome(home).
				WithConfig(cfg).
				WithClient(client)

			var (
				muxRouter         = mux.NewRouter()
				protectedRouter   = muxRouter.PathPrefix("/api/v1").Subrouter()
				unprotectedRouter = muxRouter.PathPrefix("/api/v1").Subrouter()
			)

			muxRouter.Use(middlewares.Log)
			muxRouter.PathPrefix("/").
				Handler(http.FileServer(http.Dir(buildFolder)))

			unprotectedRouter.Use(middlewares.AddHeaders)
			auth.RegisterRoutes(unprotectedRouter, ctx)

			protectedRouter.Use(middlewares.AddHeaders)
			protectedRouter.Use(middlewares.TokenVerify(ctx))
			account.RegisterRoutes(protectedRouter, ctx)
			bank.RegisterRoutes(protectedRouter, ctx)
			config.RegisterRoutes(protectedRouter, ctx)
			distribution.RegisterRoutes(protectedRouter, ctx)
			gov.RegisterRoutes(protectedRouter, ctx)
			keys.RegisterRoutes(protectedRouter, ctx)
			staking.RegisterRoutes(protectedRouter, ctx)

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
