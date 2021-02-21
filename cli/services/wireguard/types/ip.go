package types

import (
	"fmt"
	"net"
	"strings"
)

type IPNet struct {
	IP  net.IP
	Net uint8
}

func (r *IPNet) String() string {
	return fmt.Sprintf("%s/%d", r.IP.String(), r.Net)
}

type Endpoint struct {
	Host string
	Port uint16
}

func (e *Endpoint) String() string {
	if strings.IndexByte(e.Host, ':') > 0 {
		return fmt.Sprintf("[%s]:%d", e.Host, e.Port)
	}

	return fmt.Sprintf("%s:%d", e.Host, e.Port)
}

func (e *Endpoint) IsEmpty() bool {
	return e.Host == ""
}
