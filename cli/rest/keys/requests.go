package keys

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type RequestAddKey struct {
	Name          string `json:"name"`
	Mnemonic      string `json:"mnemonic"`
	Password      string `json:"password"`
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
	if r.Password == "" {
		return fmt.Errorf("invalid field password")
	}

	return nil
}

type RequestDeleteKey struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func NewRequestDeleteKey(r *http.Request) (*RequestDeleteKey, error) {
	var body RequestDeleteKey
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	vars := mux.Vars(r)
	body.Name = vars["name"]

	return &body, nil
}

func (r *RequestDeleteKey) Validate() error {
	if r.Name == "" {
		return fmt.Errorf("invalid field name")
	}
	if r.Password == "" {
		return fmt.Errorf("invalid field password")
	}

	return nil
}
