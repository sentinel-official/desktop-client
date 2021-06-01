package distribution

import (
	"encoding/json"
	"fmt"
	"net/http"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

type RequestWithdrawRewards struct {
	Memo       string   `json:"memo"`
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
	if len(r.Validators) == 0 {
		return fmt.Errorf("invalid validators length; expected length is more than 0")
	}

	for _, address := range r.Validators {
		if _, err := sdk.ValAddressFromBech32(address); err != nil {
			return err
		}
	}

	return nil
}
