package bank

import (
	"encoding/json"
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type RequestSend struct {
	Memo  string       `json:"memo"`
	To    string       `json:"to"`
	Coins common.Coins `json:"coins"`
}

func NewRequestSend(r *http.Request) (*RequestSend, error) {
	var body RequestSend
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestSend) Validate() error {
	if _, err := sdk.AccAddressFromBech32(r.To); err != nil {
		return err
	}

	return nil
}
