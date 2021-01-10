package subscription

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type RequestAddSubscription struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	To     string     `json:"to"`
	Amount other.Coin `json:"amount"`

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
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}

	return nil
}

type RequestCancelSubscription struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	To     string     `json:"to"`
	Amount other.Coin `json:"amount"`

	ID    uint64 `json:"id"`
	Denom string `json:"denom"`
}

func NewRequestCancelSubscription(r *http.Request) (*RequestCancelSubscription, error) {
	var body RequestCancelSubscription
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestCancelSubscription) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}

	return nil
}
