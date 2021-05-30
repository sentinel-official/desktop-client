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
setup = {{ .Setup }}

[chain]
broadcast_mode = "{{ .Chain.BroadcastMode }}"
gas_adjustment = {{ .Chain.GasAdjustment }}
gas = {{ .Chain.Gas }}
gas_prices = "{{ .Chain.GasPrices }}"
id = "{{ .Chain.ID }}"
rpc_address = "{{ .Chain.RPCAddress }}"
simulate_and_execute = {{ .Chain.SimulateAndExecute }}

[cors]
allowed_origins = "{{ .CORS.AllowedOrigins }}"
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
	Setup bool `json:"setup"`
	Chain struct {
		BroadcastMode      string  `json:"broadcast_mode"`
		GasAdjustment      float64 `json:"gas_adjustment"`
		GasPrices          string  `json:"gas_prices"`
		Gas                uint64  `json:"gas"`
		ID                 string  `json:"id"`
		RPCAddress         string  `json:"rpc_address"`
		SimulateAndExecute bool    `json:"simulate_and_execute"`
	} `json:"chain"`
	CORS struct {
		AllowedOrigins string `json:"allowed_origins"`
	} `json:"cors"`
}

func NewConfig() *Config {
	return &Config{}
}

func (c *Config) Copy() *Config {
	return &Config{
		Setup: c.Setup,
		Chain: c.Chain,
		CORS:  c.CORS,
	}
}

func (c *Config) WithDefaultValues() *Config {
	c.Setup = true
	c.Chain.BroadcastMode = "block"
	c.Chain.Gas = 5e5
	c.Chain.GasAdjustment = 0
	c.Chain.GasPrices = "0.1udvpn"
	c.Chain.ID = "sentinelhub-2"
	c.Chain.RPCAddress = "https://rpc.sentinel.co:443"
	c.Chain.SimulateAndExecute = true
	c.CORS.AllowedOrigins = ""

	return c
}

func (c *Config) LoadFromPath(path string) error {
	if _, err := os.Stat(path); err != nil {
		return err
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
		return fmt.Errorf("invalid chain->broadcast_mode; expected non-empty value")
	}
	if c.Chain.GasAdjustment < 0 {
		return fmt.Errorf("invalid chain->gas_adjustment; expected non-negative value")
	}
	if c.Chain.ID == "" {
		return fmt.Errorf("invalid chain->id; expected non-empty value")
	}
	if c.Chain.RPCAddress == "" {
		return fmt.Errorf("invalid chain->rpc_address; expected non-empty value")
	}

	return nil
}
