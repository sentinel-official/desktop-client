package wireguard

import (
	"fmt"
	"net"
	"strings"

	"golang.org/x/net/nettest"
)

func (w *WireGuard) Initialize() error {
	iFace, err := nettest.RoutedInterface("ip", net.FlagUp|net.FlagBroadcast)
	if err != nil {
		return err
	}

	w.cfg.Interface.PostUp = strings.Join([]string{
		"iptables -A FORWARD -i %i -j ACCEPT",
		fmt.Sprintf("iptables -t nat -A POSTROUTING -o %s -j MASQUERADE", iFace.Name),
		"ip6tables -A FORWARD -i %i -j ACCEPT",
		fmt.Sprintf("ip6tables -t nat -A POSTROUTING -o %s -j MASQUERADE", iFace.Name),
	}, ";")
	w.cfg.Interface.PostDown = strings.Join([]string{
		"iptables -D FORWARD -i %i -j ACCEPT",
		fmt.Sprintf("iptables -t nat -D POSTROUTING -o %s -j MASQUERADE", iFace.Name),
		"ip6tables -D FORWARD -i %i -j ACCEPT",
		fmt.Sprintf("ip6tables -t nat -D POSTROUTING -o %s -j MASQUERADE", iFace.Name),
	}, ";")

	return w.cfg.WriteToFile(w.cfgDir)
}
