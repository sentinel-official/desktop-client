package types

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"text/template"

	"github.com/pelletier/go-toml"
)

var (
	ct = strings.TrimSpace(`
[chain]
broadcast_mode = "{{ .Chain.BroadcastMode }}"
fees = "{{ .Chain.Fees }}"
gas_adjustment = {{ .Chain.GasAdjustment }}
gas = {{ .Chain.Gas }}
gas_prices = "{{ .Chain.GasPrices }}"
id = "{{ .Chain.ID }}"
rpc_address = "{{ .Chain.RPCAddress }}"
simulate_and_execute = {{ .Chain.SimulateAndExecute }}
trust_node = {{ .Chain.TrustNode }}
	`)

	t = func() *template.Template {
		t, err := template.New("config").Parse(ct)
		if err != nil {
			panic(err)
		}

		return t
	}()
)

type Config struct {
	Chain struct {
		BroadcastMode      string  `json:"broadcast_mode"`
		Fees               string  `json:"fees"`
		GasAdjustment      float64 `json:"gas_adjustment"`
		GasPrices          string  `json:"gas_prices"`
		Gas                uint64  `json:"gas"`
		ID                 string  `json:"id"`
		RPCAddress         string  `json:"rpc_address"`
		SimulateAndExecute bool    `json:"simulate_and_execute"`
		TrustNode          bool    `json:"trust_node"`
	} `json:"chain"`
}

func NewConfig() *Config {
	return &Config{}
}

func (c *Config) WithDefaultValues() *Config {
	c.Chain.BroadcastMode = "block"
	c.Chain.Fees = ""
	c.Chain.Gas = 1e5
	c.Chain.GasAdjustment = 0
	c.Chain.GasPrices = "0.01tsent"
	c.Chain.ID = "sentinel-turing-3a"
	c.Chain.RPCAddress = "https://rpc.turing.sentinel.co:443"
	c.Chain.SimulateAndExecute = true
	c.Chain.TrustNode = false

	return c
}

func (c *Config) LoadFromPath(path string) error {
	if _, err := os.Stat(path); err != nil {
		cfg := NewConfig().WithDefaultValues()
		if err := cfg.SaveToPath(path); err != nil {
			return err
		}
	}

	data, err := ioutil.ReadFile(path)
	if err != nil {
		return err
	}

	if len(data) == 0 {
		*c = Config{}
		return nil
	}

	tree, err := toml.LoadBytes(data)
	if err != nil {
		return err
	}

	data, err = json.Marshal(tree.ToMap())
	if err != nil {
		return err
	}

	return json.Unmarshal(data, c)
}

func (c *Config) SaveToPath(path string) error {
	var buffer bytes.Buffer
	if err := t.Execute(&buffer, c); err != nil {
		return err
	}

	return ioutil.WriteFile(path, buffer.Bytes(), 0600)
}

func (c *Config) String() string {
	var buffer bytes.Buffer
	if err := t.Execute(&buffer, c); err != nil {
		panic(err)
	}

	return buffer.String()
}

func (c *Config) Validate() error {
	if c.Chain.BroadcastMode == "" {
		return fmt.Errorf("invalid field Chain.BroadcastMode")
	}
	if c.Chain.GasAdjustment < 0 {
		return fmt.Errorf("invalid field Chain.GasAdjustment")
	}
	if c.Chain.ID == "" {
		return fmt.Errorf("invalid field Chain.ID")
	}
	if c.Chain.RPCAddress == "" {
		return fmt.Errorf("invalid field Chain.RPCAddress")
	}

	return nil
}
