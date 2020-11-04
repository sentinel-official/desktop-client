package login

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestAuthenticate struct {
	Password string `json:"password"`
}

func NewRequestAuthenticate(r *http.Request) (*RequestAuthenticate, error) {
	var body RequestAuthenticate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestAuthenticate) Validate() error {
	if r.Password == "" {
		return fmt.Errorf("invalid field password")
	}

	return nil
}
