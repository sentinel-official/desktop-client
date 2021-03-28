package types

import (
	"os"
	"path/filepath"
)

var (
	Version              = ""
	DefaultListenURL     = "http://127.0.0.1:26667"
	DefaultHomeDirectory = func() string {
		home, err := os.UserHomeDir()
		if err != nil {
			panic(err)
		}

		return filepath.Join(home, ".sentinel", "client")
	}()
)
