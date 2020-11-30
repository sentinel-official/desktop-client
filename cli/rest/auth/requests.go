package auth

import (
	"encoding/json"
	"net/http"
)

type RequestLogin struct {
	Password string `json:"password"`
}

func NewRequestLogin(r *http.Request) (*RequestLogin, error) {
	var body RequestLogin
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestLogin) Validate() error {
	return nil
}
