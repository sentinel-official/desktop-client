package config

import (
	"crypto/sha256"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"

	"github.com/tendermint/tendermint/libs/log"
	"github.com/tendermint/tendermint/lite/proxy"
	rpchttp "github.com/tendermint/tendermint/rpc/client/http"

	"github.com/sentinel-official/desktop-client/cli/context"
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
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1001, err.Error())
			return
		}
		if err := body.Validate(); err != nil {
			utils.WriteErrorToResponse(w, http.StatusBadRequest, 1002, err.Error())
			return
		}

		var (
			cfg    = ctx.Config().Copy()
			client = ctx.Client().Copy()
		)

		if body.Setup != cfg.Setup {
			cfg.Setup = body.Setup
		}
		if body.From != "" && body.From != client.FromName() {
			info, err := client.Keybase().Get(body.From)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
				return
			}

			client.WithFrom(body.From).
				WithFromName(body.From).
				WithFromAddress(info.GetAddress())
		}
		if body.Password != "" && body.Password != cfg.Password {
			cfg.Password = fmt.Sprintf("%X", sha256.Sum256([]byte(body.Password)))
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
		if body.Chain.ID != cfg.Chain.ID && body.Chain.RPCAddress != cfg.Chain.RPCAddress {
			node, err := rpchttp.New(body.Chain.RPCAddress, "/websocket")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			verifierDir, err := ioutil.TempDir(os.TempDir(), "verifier-*")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			verifier, err := proxy.NewVerifier(body.Chain.ID, verifierDir, node, log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			cfg.Chain.ID = body.Chain.ID
			cfg.Chain.RPCAddress = body.Chain.RPCAddress
			client.WithNodeURI(body.Chain.RPCAddress).
				WithNode(node).
				WithVerifier(verifier).
				WithChainID(body.Chain.ID)
		}
		if body.Chain.ID != cfg.Chain.ID {
			verifierDir, err := ioutil.TempDir(os.TempDir(), "verifier-*")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			verifier, err := proxy.NewVerifier(body.Chain.ID, verifierDir, client.Node(), log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			cfg.Chain.ID = body.Chain.ID
			client.WithChainID(body.Chain.ID).
				WithVerifier(verifier)
		}
		if body.Chain.RPCAddress != cfg.Chain.RPCAddress {
			node, err := rpchttp.New(body.Chain.RPCAddress, "/websocket")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			verifierDir, err := ioutil.TempDir(os.TempDir(), "verifier-*")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			verifier, err := proxy.NewVerifier(client.ChainID(), verifierDir, node, log.NewNopLogger(), 16)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
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
				node, err := rpchttp.New(cfg.Chain.RPCAddress, "/websocket")
				if err != nil {
					utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
					return
				}

				verifierDir, err := ioutil.TempDir(os.TempDir(), "verifier-*")
				if err != nil {
					utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
					return
				}

				verifier, err := proxy.NewVerifier(client.ChainID(), verifierDir, node, log.NewNopLogger(), 16)
				if err != nil {
					utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
					return
				}

				client.WithVerifier(verifier)
			} else {
				client.WithVerifier(nil)
			}
		}

		if err := cfg.SaveToPath(filepath.Join(ctx.Home(), "config.toml")); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1005, err.Error())
			return
		}

		ctx.WithConfig(cfg.Copy()).
			WithClient(client.Copy())

		cfg.Password = ""
		utils.WriteResultToResponse(w, http.StatusOK, cfg)
	}
}
