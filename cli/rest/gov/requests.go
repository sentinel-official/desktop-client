package gov

import (
	"encoding/json"
	"net/http"

	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
)

type RequestVote struct {
	Memo   string `json:"memo"`
	Option string `json:"option"`
}

func NewRequestVote(r *http.Request) (*RequestVote, error) {
	var body RequestVote
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestVote) Validate() error {
	if _, err := govtypes.VoteOptionFromString(r.Option); err != nil {
		return err
	}

	return nil
}
