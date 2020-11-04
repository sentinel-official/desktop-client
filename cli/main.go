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

func main() {
	sent.GetConfig().Seal()
	root := &cobra.Command{
		Use:          "sentinel-desktop-client",
		SilenceUsage: true,
	}

	root.AddCommand(
		cmd.ServerCmd(),
	)

	root.PersistentFlags().String(types.FlagHome, types.DefaultHomeDirectory, "home")
	_ = viper.BindPFlag(types.FlagHome, root.PersistentFlags().Lookup(types.FlagHome))

	var (
		home    = viper.GetString(types.FlagHome)
		cfgFile = filepath.Join(home, "config.toml")
	)

	if _, err := os.Stat(cfgFile); err != nil {
		if err = os.MkdirAll(home, 0700); err != nil {
			panic(err)
		}

		cfg := types.NewConfig()
		if err := cfg.LoadFromPath(cfgFile); err != nil {
			panic(err)
		}
	}

	_ = root.Execute()
}
