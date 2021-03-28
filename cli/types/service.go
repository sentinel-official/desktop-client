package types

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

type Service interface {
	Info() []byte
	PreUp() error
	Up() error
	PostUp() error
	PreDown() error
	Down() error
	PostDown() error
	Transfer() (int64, int64, error)
}

type Status struct {
	From string `json:"from"`
	ID   uint64 `json:"id"`
	Name string `json:"name"`
	To   string `json:"to"`
}

func NewStatus() *Status {
	return &Status{}
}

func (s *Status) WithFrom(v string) *Status { s.From = v; return s }
func (s *Status) WithID(v uint64) *Status   { s.ID = v; return s }
func (s *Status) WithName(v string) *Status { s.Name = v; return s }
func (s *Status) WithTo(v string) *Status   { s.To = v; return s }

func (s *Status) LoadFromPath(path string) error {
	if _, err := os.Stat(path); err != nil {
		return nil
	}

	data, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}
	if len(data) == 0 {
		return nil
	}

	return json.Unmarshal(data, s)
}

func (s *Status) SaveToPath(path string) error {
	bytes, err := json.Marshal(s)
	if err != nil {
		return err
	}

	return ioutil.WriteFile(path, bytes, 0600)
}
