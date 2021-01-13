package cmd

import (
	"fmt"
	"log"
	"net/http"
	neturl "net/url"
	"path/filepath"
	"strings"

	clientutils "github.com/cosmos/cosmos-sdk/x/auth/client/utils"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/sentinel-official/hub"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/lite"
	"github.com/sentinel-official/desktop-client/cli/middlewares"
	"github.com/sentinel-official/desktop-client/cli/rest/account"
	"github.com/sentinel-official/desktop-client/cli/rest/auth"
	"github.com/sentinel-official/desktop-client/cli/rest/bank"
	"github.com/sentinel-official/desktop-client/cli/rest/config"
	"github.com/sentinel-official/desktop-client/cli/rest/deposit"
	"github.com/sentinel-official/desktop-client/cli/rest/distribution"
	"github.com/sentinel-official/desktop-client/cli/rest/gov"
	"github.com/sentinel-official/desktop-client/cli/rest/keys"
	"github.com/sentinel-official/desktop-client/cli/rest/node"
	"github.com/sentinel-official/desktop-client/cli/rest/plan"
	"github.com/sentinel-official/desktop-client/cli/rest/provider"
	"github.com/sentinel-official/desktop-client/cli/rest/session"
	"github.com/sentinel-official/desktop-client/cli/rest/staking"
	"github.com/sentinel-official/desktop-client/cli/rest/subscription"
	"github.com/sentinel-official/desktop-client/cli/types"
)

func ServerCmd(cfg *types.Config) *cobra.Command {
	var (
		listenURL string
		keyFile   string
		certFile  string
	)

	cmd := &cobra.Command{
		Use:   "server",
		Short: "Start REST API server",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			defCfg := types.NewConfig().WithDefaultValues()
			if viper.GetString(flagCORSAllowedOrigins) != defCfg.CORS.AllowedOrigins {
				cfg.CORS.AllowedOrigins = viper.GetString(flagCORSAllowedOrigins)
			}

			return nil
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			home, err := cmd.Flags().GetString(types.FlagHome)
			if err != nil {
				return err
			}

			var (
				cdc         = hub.MakeCodec()
				buildFolder = filepath.Join(home, "build")
			)

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
			// protectedRouter.Use(middlewares.TokenVerify(ctx))
			account.RegisterRoutes(protectedRouter, ctx)
			bank.RegisterRoutes(protectedRouter, ctx)
			config.RegisterRoutes(protectedRouter, ctx)
			deposit.RegisterRoutes(protectedRouter, ctx)
			distribution.RegisterRoutes(protectedRouter, ctx)
			gov.RegisterRoutes(protectedRouter, ctx)
			keys.RegisterRoutes(protectedRouter, ctx)
			node.RegisterRoutes(protectedRouter, ctx)
			plan.RegisterRoutes(protectedRouter, ctx)
			provider.RegisterRoutes(protectedRouter, ctx)
			session.RegisterRoutes(protectedRouter, ctx)
			staking.RegisterRoutes(protectedRouter, ctx)
			subscription.RegisterRoutes(protectedRouter, ctx)

			router := cors.New(
				cors.Options{
					AllowedOrigins: strings.Split(cfg.CORS.AllowedOrigins, ","),
					AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut},
					AllowedHeaders: []string{"Authorization", "Content-Type"},
				},
			).Handler(muxRouter)

			url, err := neturl.Parse(listenURL)
			if err != nil {
				return err
			}

			log.Printf("Listening on URL %s\n", listenURL)
			switch url.Scheme {
			case "http":
				return http.ListenAndServe(url.Host, router)
			case "https":
				return http.ListenAndServeTLS(url.Host, certFile, keyFile, router)
			default:
				return fmt.Errorf("invalid listen URL schema")
			}
		},
	}

	cmd.Flags().StringVar(&listenURL, flagListenURL, types.DefaultListenURL, "")
	cmd.Flags().StringVar(&keyFile, flagTLSKey, filepath.Join(types.DefaultHomeDirectory, "tls.key"), "")
	cmd.Flags().StringVar(&certFile, flagTLSCrt, filepath.Join(types.DefaultHomeDirectory, "tls.crt"), "")
	cmd.Flags().String(flagCORSAllowedOrigins, cfg.CORS.AllowedOrigins, "")

	_ = viper.BindPFlag(flagCORSAllowedOrigins, cmd.Flags().Lookup(flagCORSAllowedOrigins))

	return cmd
}
