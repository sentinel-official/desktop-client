package keys

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestAddKey struct {
	Name          string `json:"name"`
	Mnemonic      string `json:"mnemonic"`
	BIP39Password string `json:"bip_39_password"`
}

func NewRequestAddKey(r *http.Request) (*RequestAddKey, error) {
	var body RequestAddKey
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestAddKey) Validate() error {
	if r.Name == "" {
		return fmt.Errorf("invalid field name")
	}

	return nil
}
