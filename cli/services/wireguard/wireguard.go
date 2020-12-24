package wireguard

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/sentinel-official/desktop-client/cli/services/wireguard/types"
)

type WireGuard struct {
	cfg    *types.Config
	cfgDir string
}

func NewWireGuard() *WireGuard {
	return &WireGuard{}
}

func (w *WireGuard) WithConfig(cfg *types.Config) *WireGuard {
	w.cfg = cfg
	return w
}

func (w *WireGuard) WithConfigDir(dir string) *WireGuard {
	w.cfgDir = dir
	return w
}

func (w WireGuard) Start() error {
	cmd := exec.Command("wg-quick", strings.Split(
		fmt.Sprintf("up %s", filepath.Join(w.cfgDir, fmt.Sprintf("%s.conf", w.cfg.Name))), " ")...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}

func (w WireGuard) Stop() error {
	cmd := exec.Command("wg-quick", strings.Split(
		fmt.Sprintf("down %s", w.cfg.Name), " ")...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}

func (w WireGuard) Transfer() (int64, int64, error) {
	output, err := exec.Command("wg", strings.Split(
		fmt.Sprintf("show %s transfer", w.cfg.Name), " ")...).Output()
	if err != nil {
		return 0, 0, err
	}

	lines := strings.Split(string(output), "\n")
	for _, line := range lines {
		columns := strings.Split(line, "\t")
		if len(columns) != 3 {
			continue
		}

		download, err := strconv.ParseInt(columns[1], 10, 64)
		if err != nil {
			return 0, 0, err
		}

		upload, err := strconv.ParseInt(columns[2], 10, 64)
		if err != nil {
			return 0, 0, err
		}

		return download, upload, nil
	}

	return 0, 0, nil
}
