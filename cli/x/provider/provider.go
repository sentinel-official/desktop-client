package provider

import (
	providertypes "github.com/sentinel-official/hub/x/provider/types"
)

type Provider struct {
	Address     string `json:"address"`
	Name        string `json:"name"`
	Identity    string `json:"identity"`
	Website     string `json:"website"`
	Description string `json:"description"`
}

func NewProviderFromRaw(item *providertypes.Provider) Provider {
	return Provider{
		Address:     item.Address,
		Name:        item.Name,
		Identity:    item.Identity,
		Website:     item.Website,
		Description: item.Description,
	}
}

type Providers []Provider

func NewProvidersFromRaw(items providertypes.Providers) Providers {
	providers := make(Providers, 0, len(items))
	for i := range items {
		providers = append(providers, NewProviderFromRaw(&items[i]))
	}

	return providers
}
