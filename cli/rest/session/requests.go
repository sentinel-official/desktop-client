package session

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestAddSession struct {
	Host      string `json:"host"`
	Port      uint16 `json:"port"`
	RemoteURL string `json:"remote_url"`
}

func NewRequestAddSession(r *http.Request) (*RequestAddSession, error) {
	var body RequestAddSession
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestAddSession) Validate() error {
	if r.Host == "" {
		return fmt.Errorf("invalid field Host")
	}
	if r.Port == 0 {
		return fmt.Errorf("invalid field Port")
	}
	if r.RemoteURL == "" {
		return fmt.Errorf("invalid field RemoteURL")
	}

	return nil
}
