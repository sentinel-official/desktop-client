package cmd

import (
	"fmt"
	"log"
	"net/http"
	neturl "net/url"
	"path/filepath"
	"strings"

	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/std"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/sentinel-official/hub"
	"github.com/sentinel-official/hub/params"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	rpchttp "github.com/tendermint/tendermint/rpc/client/http"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/lite"
	"github.com/sentinel-official/desktop-client/cli/middlewares"
	"github.com/sentinel-official/desktop-client/cli/rest/account"
	"github.com/sentinel-official/desktop-client/cli/rest/bank"
	"github.com/sentinel-official/desktop-client/cli/rest/config"
	"github.com/sentinel-official/desktop-client/cli/rest/deposit"
	"github.com/sentinel-official/desktop-client/cli/rest/distribution"
	"github.com/sentinel-official/desktop-client/cli/rest/gov"
	"github.com/sentinel-official/desktop-client/cli/rest/keys"
	"github.com/sentinel-official/desktop-client/cli/rest/node"
	"github.com/sentinel-official/desktop-client/cli/rest/plan"
	"github.com/sentinel-official/desktop-client/cli/rest/provider"
	"github.com/sentinel-official/desktop-client/cli/rest/service"
	"github.com/sentinel-official/desktop-client/cli/rest/session"
	"github.com/sentinel-official/desktop-client/cli/rest/staking"
	"github.com/sentinel-official/desktop-client/cli/rest/subscription"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func ServerCmd(cfg *types.Config) *cobra.Command {
	var (
		listenURL string
		keyFile   string
		certFile  string
		defCfg    = types.NewConfig().WithDefaultValues()
	)

	cmd := &cobra.Command{
		Use:   "server",
		Short: "Start REST API server",
		PreRunE: func(cmd *cobra.Command, args []string) error {
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

			encoding := params.MakeEncodingConfig()
			std.RegisterInterfaces(encoding.InterfaceRegistry)
			hub.ModuleBasics.RegisterInterfaces(encoding.InterfaceRegistry)

			rpcclient, err := rpchttp.New(cfg.Chain.RPCAddress, "/websocket")
			if err != nil {
				return err
			}

			kr, err := keyring.New("sentinel", keyring.BackendOS, home, cmd.InOrStdin())
			if err != nil {
				return err
			}

			client := lite.NewDefaultClient().
				WithAccountRetriever(authtypes.AccountRetriever{}).
				WithChainID(cfg.Chain.ID).
				WithClient(rpcclient).
				WithGas(cfg.Chain.Gas).
				WithGasAdjustment(cfg.Chain.GasAdjustment).
				WithGasPrices(cfg.Chain.GasPrices).
				WithInterfaceRegistry(encoding.InterfaceRegistry).
				WithKeyring(kr).
				WithLegacyAmino(encoding.Amino).
				WithNodeURI(cfg.Chain.RPCAddress).
				WithSimulateAndExecute(cfg.Chain.SimulateAndExecute).
				WithTxConfig(encoding.TxConfig)

			ctx := context.NewContext().
				WithHome(home).
				WithConfig(cfg).
				WithClient(client).
				WithToken(utils.RandomStringHex(32))

			var (
				muxRouter    = mux.NewRouter()
				prefixRouter = muxRouter.PathPrefix("/api/v1").Subrouter()
			)

			muxRouter.Use(middlewares.Log)
			prefixRouter.Use(middlewares.AddHeaders)
			prefixRouter.Use(middlewares.TokenVerify(ctx))
			account.RegisterRoutes(prefixRouter, ctx)
			bank.RegisterRoutes(prefixRouter, ctx)
			config.RegisterRoutes(prefixRouter, ctx)
			deposit.RegisterRoutes(prefixRouter, ctx)
			distribution.RegisterRoutes(prefixRouter, ctx)
			gov.RegisterRoutes(prefixRouter, ctx)
			keys.RegisterRoutes(prefixRouter, ctx)
			node.RegisterRoutes(prefixRouter, ctx)
			plan.RegisterRoutes(prefixRouter, ctx)
			provider.RegisterRoutes(prefixRouter, ctx)
			service.RegisterRoutes(prefixRouter, ctx)
			session.RegisterRoutes(prefixRouter, ctx)
			staking.RegisterRoutes(prefixRouter, ctx)
			subscription.RegisterRoutes(prefixRouter, ctx)

			router := cors.New(
				cors.Options{
					AllowedOrigins: strings.Split(cfg.CORS.AllowedOrigins, ","),
					AllowedMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut},
					AllowedHeaders: []string{"Content-Type", "Authorization"},
				},
			).Handler(muxRouter)

			url, err := neturl.Parse(listenURL)
			if err != nil {
				return err
			}

			switch url.Scheme {
			case "http", "https":
			default:
				return fmt.Errorf("invalid listen URL schema")
			}

			log.Printf("URL: %s, TOKEN: %s", listenURL, ctx.Token())
			switch url.Scheme {
			case "http":
				return http.ListenAndServe(url.Host, router)
			case "https":
				return http.ListenAndServeTLS(url.Host, certFile, keyFile, router)
			default:
				return nil
			}
		},
	}

	cmd.Flags().StringVar(&listenURL, flagListenURL, types.DefaultListenURL, "")
	cmd.Flags().StringVar(&keyFile, flagTLSKey, filepath.Join(types.DefaultHomeDirectory, "tls.key"), "")
	cmd.Flags().StringVar(&certFile, flagTLSCrt, filepath.Join(types.DefaultHomeDirectory, "tls.crt"), "")
	cmd.Flags().String(flagCORSAllowedOrigins, defCfg.CORS.AllowedOrigins, "")

	_ = viper.BindPFlag(flagCORSAllowedOrigins, cmd.Flags().Lookup(flagCORSAllowedOrigins))

	return cmd
}
