package subscription

import (
	subscriptiontypes "github.com/sentinel-official/hub/x/subscription/types"
)

type Quota struct {
	Address   string `json:"address"`
	Consumed  int64  `json:"consumed"`
	Allocated int64  `json:"allocated"`
}

func NewQuotaFromRaw(item *subscriptiontypes.Quota) Quota {
	return Quota{
		Address:   item.Address,
		Consumed:  item.Consumed.Int64(),
		Allocated: item.Allocated.Int64(),
	}
}

type Quotas []Quota

func NewQuotasFromRaw(items subscriptiontypes.Quotas) Quotas {
	quotas := make(Quotas, 0, len(items))
	for _, item := range items {
		quotas = append(quotas, NewQuotaFromRaw(&item))
	}

	return quotas
}
