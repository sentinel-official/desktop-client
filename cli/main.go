package main

import (
	"os"
	"path/filepath"

	sent "github.com/sentinel-official/hub/types"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/sentinel-official/desktop-client/cli/cmd"
	"github.com/sentinel-official/desktop-client/cli/types"
)

const (
	flagChainBroadcastMode      = "chain.broadcast-mode"
	flagChainFees               = "chain.fees"
	flagChainGasAdjustment      = "chain.gas-adjustment"
	flagChainGas                = "chain.gas"
	flagChainGasPrices          = "chain.gas-prices"
	flagChainID                 = "chain.id"
	flagChainRPCAddress         = "chain.rpc-address"
	flagChainSimulateAndExecute = "chain.simulate-and-execute"
	flagChainTrustNode          = "chain.trust-node"
)

func main() {
	sent.GetConfig().Seal()

	var (
		cfg  = types.NewConfig().WithDefaultValues()
		root = &cobra.Command{
			Use:          "sdccli",
			SilenceUsage: true,
			PersistentPreRunE: func(_ *cobra.Command, _ []string) error {
				home := viper.GetString(types.FlagHome)
				if _, err := os.Stat(home); err != nil {
					if err = os.MkdirAll(home, 0700); err != nil {
						return err
					}
				}

				cfgFile := filepath.Join(home, "config.toml")
				if err := cfg.LoadFromPath(cfgFile); err != nil {
					return err
				}

				defCfg := types.NewConfig().WithDefaultValues()
				if viper.GetString(flagChainBroadcastMode) != defCfg.Chain.BroadcastMode {
					cfg.Chain.BroadcastMode = viper.GetString(flagChainBroadcastMode)
				}
				if viper.GetString(flagChainFees) != defCfg.Chain.Fees {
					cfg.Chain.Fees = viper.GetString(flagChainFees)
				}
				if viper.GetFloat64(flagChainGasAdjustment) != defCfg.Chain.GasAdjustment {
					cfg.Chain.GasAdjustment = viper.GetFloat64(flagChainGasAdjustment)
				}
				if viper.GetString(flagChainGasPrices) != defCfg.Chain.GasPrices {
					cfg.Chain.GasPrices = viper.GetString(flagChainGasPrices)
				}
				if viper.GetUint64(flagChainGas) != defCfg.Chain.Gas {
					cfg.Chain.Gas = viper.GetUint64(flagChainGas)
				}
				if viper.GetString(flagChainID) != defCfg.Chain.ID {
					cfg.Chain.ID = viper.GetString(flagChainID)
				}
				if viper.GetString(flagChainRPCAddress) != defCfg.Chain.RPCAddress {
					cfg.Chain.RPCAddress = viper.GetString(flagChainRPCAddress)
				}
				if viper.GetBool(flagChainSimulateAndExecute) != defCfg.Chain.SimulateAndExecute {
					cfg.Chain.SimulateAndExecute = viper.GetBool(flagChainSimulateAndExecute)
				}
				if viper.GetBool(flagChainTrustNode) != defCfg.Chain.TrustNode {
					cfg.Chain.TrustNode = viper.GetBool(flagChainTrustNode)
				}

				return cfg.Validate()
			},
		}
	)

	root.PersistentFlags().String(types.FlagHome, types.DefaultHomeDirectory, "")
	root.PersistentFlags().String(flagChainBroadcastMode, cfg.Chain.BroadcastMode, "")
	root.PersistentFlags().String(flagChainFees, cfg.Chain.Fees, "")
	root.PersistentFlags().Float64(flagChainGasAdjustment, cfg.Chain.GasAdjustment, "")
	root.PersistentFlags().String(flagChainGasPrices, cfg.Chain.GasPrices, "")
	root.PersistentFlags().Uint64(flagChainGas, cfg.Chain.Gas, "")
	root.PersistentFlags().String(flagChainID, cfg.Chain.ID, "")
	root.PersistentFlags().String(flagChainRPCAddress, cfg.Chain.RPCAddress, "")
	root.PersistentFlags().Bool(flagChainSimulateAndExecute, cfg.Chain.SimulateAndExecute, "")
	root.PersistentFlags().Bool(flagChainTrustNode, cfg.Chain.TrustNode, "")

	_ = viper.BindPFlag(types.FlagHome, root.PersistentFlags().Lookup(types.FlagHome))
	_ = viper.BindPFlag(flagChainBroadcastMode, root.PersistentFlags().Lookup(flagChainBroadcastMode))
	_ = viper.BindPFlag(flagChainFees, root.PersistentFlags().Lookup(flagChainFees))
	_ = viper.BindPFlag(flagChainGasAdjustment, root.PersistentFlags().Lookup(flagChainGasAdjustment))
	_ = viper.BindPFlag(flagChainGasPrices, root.PersistentFlags().Lookup(flagChainGasPrices))
	_ = viper.BindPFlag(flagChainGas, root.PersistentFlags().Lookup(flagChainGas))
	_ = viper.BindPFlag(flagChainID, root.PersistentFlags().Lookup(flagChainID))
	_ = viper.BindPFlag(flagChainRPCAddress, root.PersistentFlags().Lookup(flagChainRPCAddress))
	_ = viper.BindPFlag(flagChainSimulateAndExecute, root.PersistentFlags().Lookup(flagChainSimulateAndExecute))
	_ = viper.BindPFlag(flagChainTrustNode, root.PersistentFlags().Lookup(flagChainTrustNode))

	root.AddCommand(
		cmd.ServerCmd(cfg),
	)

	_ = root.Execute()
}
