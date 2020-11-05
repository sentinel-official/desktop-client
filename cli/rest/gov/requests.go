package gov

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestVote struct {
	Memo     string `json:"memo"`
	Password string `json:"password"`

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
	if r.Password == "" {
		return fmt.Errorf("invalid field Password")
	}
	if r.Option == "" {
		return fmt.Errorf("invalid field Option")
	}

	return nil
}
