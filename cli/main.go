package main

import (
	"os"

	sent "github.com/sentinel-official/hub/types"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/sentinel-official/desktop-client/cli/cmd"
	"github.com/sentinel-official/desktop-client/cli/types"
)

func main() {
	sent.GetConfig().Seal()
	root := &cobra.Command{
		Use:          "sentinel-desktop-client-cli",
		SilenceUsage: true,
		PersistentPreRunE: func(_ *cobra.Command, _ []string) error {
			home := viper.GetString(types.FlagHome)
			if _, err := os.Stat(home); err != nil {
				if err = os.MkdirAll(home, 0700); err != nil {
					return err
				}
			}

			return nil
		},
	}

	root.AddCommand(
		cmd.ServerCmd(),
	)

	root.PersistentFlags().String(types.FlagHome, types.DefaultHomeDirectory, "home")
	_ = viper.BindPFlag(types.FlagHome, root.PersistentFlags().Lookup(types.FlagHome))

	_ = root.Execute()
}
