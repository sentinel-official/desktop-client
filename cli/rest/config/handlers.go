package config

import (
	"net/http"
	"path/filepath"

	rpchttp "github.com/tendermint/tendermint/rpc/client/http"

	"github.com/sentinel-official/desktop-client/cli/context"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerGetConfig(ctx *context.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.WriteResultToResponse(w, http.StatusOK, ctx.Config())
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
		if body.From != "" && body.From != client.From() {
			info, err := client.Keyring().Key(body.From)
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1003, err.Error())
				return
			}

			client.WithFrom(body.From).
				WithFromName(body.From).
				WithFromAddress(info.GetAddress())
		}
		if body.Chain.BroadcastMode != cfg.Chain.BroadcastMode {
			cfg.Chain.BroadcastMode = body.Chain.BroadcastMode
			client.WithBroadcastMode(body.Chain.BroadcastMode)
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
			rpcclient, err := rpchttp.New(body.Chain.RPCAddress, "/websocket")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			cfg.Chain.ID = body.Chain.ID
			cfg.Chain.RPCAddress = body.Chain.RPCAddress
			client.WithNodeURI(body.Chain.RPCAddress).
				WithClient(rpcclient).
				WithChainID(body.Chain.ID)
		}
		if body.Chain.ID != cfg.Chain.ID {
			cfg.Chain.ID = body.Chain.ID
			client.WithChainID(body.Chain.ID)
		}
		if body.Chain.RPCAddress != cfg.Chain.RPCAddress {
			rpcclient, err := rpchttp.New(body.Chain.RPCAddress, "/websocket")
			if err != nil {
				utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1004, err.Error())
				return
			}

			cfg.Chain.RPCAddress = body.Chain.RPCAddress
			client.WithNodeURI(body.Chain.RPCAddress).
				WithClient(rpcclient)
		}
		if body.Chain.SimulateAndExecute != cfg.Chain.SimulateAndExecute {
			cfg.Chain.SimulateAndExecute = body.Chain.SimulateAndExecute
			client.WithSimulateAndExecute(body.Chain.SimulateAndExecute)
		}

		if err := cfg.SaveToPath(filepath.Join(ctx.Home(), "config.toml")); err != nil {
			utils.WriteErrorToResponse(w, http.StatusInternalServerError, 1005, err.Error())
			return
		}

		ctx.WithConfig(cfg.Copy()).
			WithClient(client.Copy())

		utils.WriteResultToResponse(w, http.StatusOK, cfg)
	}
}
