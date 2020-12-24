package utils

import (
	"net"
)

func GetFreeUDPPort() (uint16, error) {
	addr, err := net.ResolveUDPAddr("udp", "0.0.0.0:0")
	if err != nil {
		return 0, err
	}

	conn, err := net.ListenUDP("udp", addr)
	if err != nil {
		return 0, err
	}

	defer func() {
		_ = conn.Close()
	}()

	return uint16(conn.LocalAddr().(*net.UDPAddr).Port), nil
}
