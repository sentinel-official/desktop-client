package config

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type RequestUpdateConfig struct {
	From  string `json:"from"`
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

func NewRequestUpdateConfig(r *http.Request) (*RequestUpdateConfig, error) {
	var body RequestUpdateConfig
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}

	return &body, nil
}

func (r *RequestUpdateConfig) Validate() error {
	if r.From == "" {
		return fmt.Errorf("invalid field From")
	}
	if r.Chain.BroadcastMode == "" {
		return fmt.Errorf("invalid field Chain.BroadcastMode")
	}
	if r.Chain.GasAdjustment < 0 {
		return fmt.Errorf("invalid field Chain.GasAdjustment")
	}
	if r.Chain.ID == "" {
		return fmt.Errorf("invalid field Chain.ID")
	}
	if r.Chain.RPCAddress == "" {
		return fmt.Errorf("invalid field Chain.RPCAddress")
	}

	return nil
}
