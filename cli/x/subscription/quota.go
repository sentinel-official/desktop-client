package subscription

import (
	"github.com/sentinel-official/hub/x/subscription"
	"github.com/tendermint/tendermint/libs/common"
)

type Quota struct {
	Address   string `json:"address"`
	Consumed  int64  `json:"consumed"`
	Allocated int64  `json:"allocated"`
}

func NewQuotaFromRaw(item subscription.Quota) Quota {
	return Quota{
		Address:   common.HexBytes(item.Address.Bytes()).String(),
		Consumed:  item.Consumed.Int64(),
		Allocated: item.Allocated.Int64(),
	}
}

type Quotas []Quota

func NewQuotasFromRaw(items subscription.Quotas) Quotas {
	quotas := make(Quotas, 0, len(items))
	for _, item := range items {
		quotas = append(quotas, NewQuotaFromRaw(item))
	}

	return quotas
}
