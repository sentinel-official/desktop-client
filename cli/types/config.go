package types

import (
	"bytes"
	"crypto/sha256"
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
password = "{{ .Password }}"
setup = {{ .Setup }}

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
	Password string `json:"password,omitempty"`
	Setup    bool   `json:"setup"`
	Chain    struct {
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
	CORS struct {
		AllowedOrigins string `json:"allowed_origins"`
	} `json:"cors"`
}

func NewConfig() *Config {
	return &Config{}
}

func (c *Config) Copy() *Config {
	return &Config{
		Password: c.Password,
		Setup:    c.Setup,
		Chain:    c.Chain,
		CORS:     c.CORS,
	}
}

func (c *Config) WithDefaultValues() *Config {
	c.Password = fmt.Sprintf("%X", sha256.Sum256([]byte("admin")))
	c.Setup = true

	c.Chain.BroadcastMode = "block"
	c.Chain.Fees = ""
	c.Chain.Gas = 1e5
	c.Chain.GasAdjustment = 0
	c.Chain.GasPrices = "0.01tsent"
	c.Chain.ID = "sentinel-turing-3a"
	c.Chain.RPCAddress = "https://rpc.turing.sentinel.co:443"
	c.Chain.SimulateAndExecute = true
	c.Chain.TrustNode = false

	c.CORS.AllowedOrigins = ""

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
	if len(c.Password) != 64 {
		return fmt.Errorf("invalid field Password")
	}
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
