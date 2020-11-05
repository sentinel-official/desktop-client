package config

import (
	"net/http"
	"path/filepath"

	"github.com/spf13/viper"
	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/lite/proxy"
	rpcclient "github.com/tendermint/tendermint/rpc/client"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerGetConfig(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.WriteResultToResponse(w, 200, ctx.Config())
	}
}

func HandlerUpdateConfig(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestUpdateConfig(r)
		if err != nil {
			utils.WriteErrorToResponse(w, 400, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, 400, 2, err.Error())
			return
		}

		var (
			cfg    = ctx.Config().Copy()
			client = ctx.Client().Copy()
		)

		info, err := client.Keybase().Get(body.From)
		if err != nil {
			utils.WriteErrorToResponse(w, 500, 3, err.Error())
			return
		}

		if !info.GetAddress().Equals(client.FromAddress()) {
			client.WithFrom(body.From).
				WithFromName(body.From).
				WithFromAddress(info.GetAddress())
		}
		if body.Chain.BroadcastMode != cfg.Chain.BroadcastMode {
			cfg.Chain.BroadcastMode = body.Chain.BroadcastMode
			client.WithBroadcastMode(body.Chain.BroadcastMode)
		}
		if body.Chain.Fees != cfg.Chain.Fees {
			cfg.Chain.Fees = body.Chain.Fees
			client.WithFees(body.Chain.Fees)
		}
		if body.Chain.GasAdjustment != cfg.Chain.GasAdjustment {
			cfg.Chain.GasAdjustment = body.Chain.GasAdjustment
			client.WithGasAdjustment(body.Chain.GasAdjustment)
		}
		if body.Chain.GasPrices != cfg.Chain.GasPrices {
			cfg.Chain.GasPrices = body.Chain.GasPrices
			client.WithGasPrices(body.Chain.GasPrices)
		}
		if body.Chain.Gas != cfg.Chain.Gas {
			cfg.Chain.Gas = body.Chain.Gas
			client.WithGas(body.Chain.Gas)
		}
		if body.Chain.ID != cfg.Chain.ID {
			verifier, err := proxy.NewVerifier(body.Chain.ID, client.VerifierHome(), client.Node(), log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, 500, 4, err.Error())
				return
			}

			cfg.Chain.ID = body.Chain.ID
			client.WithChainID(body.Chain.ID).
				WithVerifier(verifier)
		}
		if body.Chain.RPCAddress != cfg.Chain.RPCAddress {
			node := rpcclient.NewHTTP(body.Chain.RPCAddress, "/websocket")

			verifier, err := proxy.NewVerifier(client.ChainID(), client.VerifierHome(), node, log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, 500, 5, err.Error())
				return
			}

			cfg.Chain.RPCAddress = body.Chain.RPCAddress
			client.WithNodeURI(body.Chain.RPCAddress).
				WithNode(node).
				WithVerifier(verifier)
		}
		if body.Chain.SimulateAndExecute != cfg.Chain.SimulateAndExecute {
			cfg.Chain.SimulateAndExecute = body.Chain.SimulateAndExecute
			client.WithSimulateAndExecute(body.Chain.SimulateAndExecute)
		}
		if body.Chain.TrustNode != cfg.Chain.TrustNode {
			cfg.Chain.TrustNode = body.Chain.TrustNode
			client.WithTrustNode(body.Chain.TrustNode)

			if !body.Chain.TrustNode {
				node := rpcclient.NewHTTP(body.Chain.RPCAddress, "/websocket")

				verifier, err := proxy.NewVerifier(client.ChainID(), client.VerifierHome(), node, log.NewNopLogger(), 16)
				if err != nil {
					utils.WriteErrorToResponse(w, 500, 6, err.Error())
					return
				}

				client.WithVerifier(verifier)
			} else {
				client.WithVerifier(nil)
			}
		}

		cfgFile := filepath.Join(viper.GetString(types.FlagHome), "config.toml")
		if err := cfg.SaveToPath(cfgFile); err != nil {
			utils.WriteErrorToResponse(w, 500, 7, err.Error())
			return
		}

		ctx.WithConfig(cfg).
			WithClient(client)

		utils.WriteResultToResponse(w, 200, cfg)
	}
}
