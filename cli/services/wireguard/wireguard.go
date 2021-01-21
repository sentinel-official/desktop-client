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
	info   []byte
}

func NewWireGuard() *WireGuard {
	return &WireGuard{}
}

func (w *WireGuard) WithConfig(v *types.Config) *WireGuard {
	w.cfg = v
	return w
}

func (w *WireGuard) WithConfigDir(v string) *WireGuard {
	w.cfgDir = v
	return w
}

func (w *WireGuard) WithInfo(v []byte) *WireGuard {
	w.info = v
	return w
}

func (w *WireGuard) Info() []byte {
	return w.info
}

func (w *WireGuard) Up() error {
	cmd := exec.Command("wg-quick", strings.Split(
		fmt.Sprintf("up %s", filepath.Join(w.cfgDir, fmt.Sprintf("%s.conf", w.cfg.Name))), " ")...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}

func (w *WireGuard) PostUp() error {
	return nil
}

func (w *WireGuard) PreDown() error {
	return nil
}

func (w *WireGuard) Down() error {
	cmd := exec.Command("wg-quick", strings.Split(
		fmt.Sprintf("down %s", filepath.Join(w.cfgDir, fmt.Sprintf("%s.conf", w.cfg.Name))), " ")...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	return cmd.Run()
}

func (w *WireGuard) PostDown() error {
	return os.Remove(filepath.Join(w.cfgDir, fmt.Sprintf("%s.conf", w.cfg.Name)))
}

func (w *WireGuard) Transfer() (int64, int64, error) {
	iFace, err := w.RealInterface()
	if err != nil {
		return 0, 0, err
	}

	output, err := exec.Command("wg", strings.Split(
		fmt.Sprintf("show %s transfer", iFace), " ")...).Output()
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
