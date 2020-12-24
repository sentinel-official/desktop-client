package wireguard

import (
	"net"

	"golang.org/x/net/nettest"
)

func (w *WireGuard) Initialize() error {
	iFace, err := nettest.RoutedInterface("ip", net.FlagUp|net.FlagBroadcast)
	if err != nil {
		return err
	}

	return w.cfg.WriteToFile(w.cfgDir)
}
