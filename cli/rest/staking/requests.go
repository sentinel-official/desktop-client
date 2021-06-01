package staking

import (
	"encoding/json"
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type RequestDelegate struct {
	Memo string      `json:"memo"`
	To   string      `json:"to"`
	Coin common.Coin `json:"coin"`
}

func NewRequestDelegate(r *http.Request) (*RequestDelegate, error) {
	var body RequestDelegate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestDelegate) Validate() error {
	if _, err := sdk.ValAddressFromBech32(r.To); err != nil {
		return err
	}

	return nil
}

type RequestRedelegate struct {
	Memo string      `json:"memo"`
	From string      `json:"from"`
	To   string      `json:"to"`
	Coin common.Coin `json:"coin"`
}

func NewRequestRedelegate(r *http.Request) (*RequestRedelegate, error) {
	var body RequestRedelegate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestRedelegate) Validate() error {
	if _, err := sdk.ValAddressFromBech32(r.From); err != nil {
		return err
	}
	if _, err := sdk.ValAddressFromBech32(r.To); err != nil {
		return err
	}

	return nil
}

type RequestUnbond struct {
	Memo string      `json:"memo"`
	From string      `json:"from"`
	Coin common.Coin `json:"coin"`
}

func NewRequestUnbond(r *http.Request) (*RequestUnbond, error) {
	var body RequestUnbond
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestUnbond) Validate() error {
	if _, err := sdk.ValAddressFromBech32(r.From); err != nil {
		return err
	}

	return nil
}
