package provider

import (
	"github.com/sentinel-official/hub/x/provider"
	"github.com/tendermint/tendermint/libs/common"
)

type Provider struct {
	Address     string `json:"address"`
	Name        string `json:"name"`
	Identity    string `json:"identity"`
	Website     string `json:"website"`
	Description string `json:"description"`
}

func NewProviderFromRaw(item provider.Provider) Provider {
	return Provider{
		Address:     common.HexBytes(item.Address.Bytes()).String(),
		Name:        item.Name,
		Identity:    item.Identity,
		Website:     item.Website,
		Description: item.Description,
	}
}

type Providers []Provider

func NewProvidersFromRaw(items provider.Providers) Providers {
	providers := make(Providers, 0, len(items))
	for _, item := range items {
		providers = append(providers, NewProviderFromRaw(item))
	}

	return providers
}
