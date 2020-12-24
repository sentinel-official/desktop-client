package staking

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type RequestDelegate struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	To     string     `json:"to"`
	Amount other.Coin `json:"amount"`
}

func NewRequestDelegate(r *http.Request) (*RequestDelegate, error) {
	var body RequestDelegate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestDelegate) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}
	if r.To == "" {
		return fmt.Errorf("invalid field To")
	}
	if r.Amount.Value <= 0 || r.Amount.Denom == "" {
		return fmt.Errorf("invalid field Amount")
	}

	return nil
}

type RequestRedelegate struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	From   string     `json:"from"`
	To     string     `json:"to"`
	Amount other.Coin `json:"amount"`
}

func NewRequestRedelegate(r *http.Request) (*RequestRedelegate, error) {
	var body RequestRedelegate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestRedelegate) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}
	if r.From == "" {
		return fmt.Errorf("invalid field From")
	}
	if r.To == "" {
		return fmt.Errorf("invalid field To")
	}
	if r.Amount.Value <= 0 || r.Amount.Denom == "" {
		return fmt.Errorf("invalid field Amount")
	}

	return nil
}

type RequestUnbond struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	From   string     `json:"from"`
	Amount other.Coin `json:"amount"`
}

func NewRequestUnbond(r *http.Request) (*RequestUnbond, error) {
	var body RequestUnbond
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestUnbond) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}
	if r.From == "" {
		return fmt.Errorf("invalid field From")
	}
	if r.Amount.Value <= 0 || r.Amount.Denom == "" {
		return fmt.Errorf("invalid field Amount")
	}

	return nil
}
