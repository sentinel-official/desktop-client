package service

import (
	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type ResponseStatus struct {
	Bandwidth other.Bandwidth `json:"bandwidth"`
	From      string          `json:"from"`
	ID        uint64          `json:"id"`
	To        string          `json:"to"`
}
