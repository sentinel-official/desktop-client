package config

import (
	"net/http"
	"path/filepath"

	"github.com/spf13/viper"

	"github.com/sentinel-official/desktop-client/cli/types"
	"github.com/sentinel-official/desktop-client/cli/utils"
)

func HandlerGetConfig(cfg *types.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		utils.WriteResultToResponse(w, 200, cfg)
	}
}

func HandlerUpdateConfig(cfg *types.Config) http.HandlerFunc {
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

		cfg.Chain.BroadcastMode = body.Chain.BroadcastMode
		cfg.Chain.Fees = body.Chain.Fees
		cfg.Chain.GasAdjustment = body.Chain.GasAdjustment
		cfg.Chain.GasPrices = body.Chain.GasPrices
		cfg.Chain.Gas = body.Chain.Gas
		cfg.Chain.ID = body.Chain.ID
		cfg.Chain.RPCAddress = body.Chain.RPCAddress
		cfg.Chain.SimulateAndExecute = body.Chain.SimulateAndExecute
		cfg.Chain.TrustNode = body.Chain.TrustNode

		cfgFile := filepath.Join(viper.GetString(types.FlagHome), "config.toml")
		if err := cfg.SaveToPath(cfgFile); err != nil {
			utils.WriteErrorToResponse(w, 500, 3, err.Error())
			return
		}

		utils.WriteResultToResponse(w, 200, cfg)
	}
}
