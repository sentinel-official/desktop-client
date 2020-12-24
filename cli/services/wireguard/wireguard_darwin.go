package wireguard

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func (w *WireGuard) Initialize() error {
	return w.cfg.WriteToFile(w.cfgDir)
}

func (w WireGuard) RealInterface() (string, error) {
	nameFile, err := os.Open(fmt.Sprintf("/var/run/wireguard/%s.name", w.cfg.Name))
	if err != nil {
		return "", err
	}

	scanner := bufio.NewReader(nameFile)

	line, err := scanner.ReadString('\n')
	if err != nil {
		return "", err
	}

	return strings.Trim(line, "\n"), nil
}
