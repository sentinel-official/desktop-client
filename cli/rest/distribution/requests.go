package distribution

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestWithdrawRewards struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

	Validators []string `json:"validators"`
}

func NewRequestWithdrawRewards(r *http.Request) (*RequestWithdrawRewards, error) {
	var body RequestWithdrawRewards
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestWithdrawRewards) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}
	if len(r.Validators) == 0 {
		return fmt.Errorf("invalid field Validators")
	}

	return nil
}
