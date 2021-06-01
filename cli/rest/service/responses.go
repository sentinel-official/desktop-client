package service

import (
	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type ResponseStatus struct {
	Bandwidth common.Bandwidth `json:"bandwidth"`
	From      string           `json:"from"`
	ID        uint64           `json:"id"`
	To        string           `json:"to"`
}
