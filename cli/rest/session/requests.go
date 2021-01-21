package session

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestAddSession struct {
	To string `json:"to"`
}

func NewRequestAddSession(r *http.Request) (*RequestAddSession, error) {
	var body RequestAddSession
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestAddSession) Validate() error {
	if r.To == "" {
		return fmt.Errorf("invalid field To")
	}

	return nil
}
