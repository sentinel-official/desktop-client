package subscription

import (
	"encoding/json"
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
	hubtypes "github.com/sentinel-official/hub/types"
)

type RequestAddSubscription struct {
	Memo  string `json:"memo"`
	To    string `json:"to"`
	Coin  string `json:"coin"`
	ID    uint64 `json:"id"`
	Denom string `json:"denom"`
}

func NewRequestAddSubscription(r *http.Request) (*RequestAddSubscription, error) {
	var body RequestAddSubscription
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestAddSubscription) Validate() error {
	if r.To != "" {
		if _, err := hubtypes.NodeAddressFromBech32(r.To); err != nil {
			return err
		}
	}
	if r.Coin != "" {
		if _, err := sdk.ParseCoinNormalized(r.Coin); err != nil {
			return err
		}
	}
	if r.Denom != "" {
		if err := sdk.ValidateDenom(r.Denom); err != nil {
			return err
		}
	}

	return nil
}

type RequestCancelSubscription struct {
	Memo string `json:"memo"`
}

func NewRequestCancelSubscription(r *http.Request) (*RequestCancelSubscription, error) {
	var body RequestCancelSubscription
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestCancelSubscription) Validate() error {
	return nil
}
