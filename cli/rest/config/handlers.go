package config

import (
	"io/ioutil"
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
		cfg := ctx.Config().Copy()
		cfg.Password = ""

		utils.WriteResultToResponse(w, http.StatusOK, cfg)
	}
}

func HandlerUpdateConfig(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := NewRequestUpdateConfig(r)
		if err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1, err.Error())
			return
		}

		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 2, err.Error())
			return
		}

		var (
			cfg    = ctx.Config().Copy()
			client = ctx.Client().Copy()
		)

		if body.From != "" {
			info, err := client.Keybase().Get(body.From)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 3, err.Error())
				return
			}

			if !info.GetAddress().Equals(client.FromAddress()) {
				client.WithFrom(body.From).
					WithFromName(body.From).
					WithFromAddress(info.GetAddress())
			}
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
			verifierDir, err := ioutil.TempDir(client.VerifierHome(), "*-verifier")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
				return
			}

			verifier, err := proxy.NewVerifier(body.Chain.ID, verifierDir, client.Node(), log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
				return
			}

			cfg.Chain.ID = body.Chain.ID
			client.WithChainID(body.Chain.ID).
				WithVerifier(verifier)
		}
		if body.Chain.RPCAddress != cfg.Chain.RPCAddress {
			node := rpcclient.NewHTTP(body.Chain.RPCAddress, "/websocket")

			verifierDir, err := ioutil.TempDir(client.VerifierHome(), "*-verifier")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
				return
			}

			verifier, err := proxy.NewVerifier(client.ChainID(), verifierDir, node, log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
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

				verifierDir, err := ioutil.TempDir(client.VerifierHome(), "*-verifier")
				if err != nil {
					utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
					return
				}

				verifier, err := proxy.NewVerifier(client.ChainID(), verifierDir, node, log.NewNopLogger(), 16)
				if err != nil {
					utils.WriteErrorToResponse(w, http.StatusInternalServerError, 4, err.Error())
					return
				}

				client.WithVerifier(verifier)
			} else {
				client.WithVerifier(nil)
			}
		}

		cfgFile := filepath.Join(viper.GetString(types.FlagHome), "config.toml")
		if err := cfg.SaveToPath(cfgFile); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 5, err.Error())
			return
		}

		ctx.WithConfig(cfg.Copy()).
			WithClient(client.Copy())

		cfg.Password = ""
		utils.WriteResultToResponse(w, http.StatusOK, cfg)
	}
}
