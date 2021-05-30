package common

import (
	deposittypes "github.com/sentinel-official/hub/x/deposit/types"
)

type Deposit struct {
	Address string `json:"address"`
	Amount  Coins  `json:"amount"`
}

func NewDepositFromRaw(item *deposittypes.Deposit) Deposit {
	return Deposit{
		Address: item.Address,
		Amount:  NewCoinsFromRaw(item.Coins),
	}
}

type Deposits []Deposit

func NewDepositsFromRaw(items deposittypes.Deposits) Deposits {
	deposits := make(Deposits, 0, len(items))
	for _, item := range items {
		deposits = append(deposits, NewDepositFromRaw(&item))
	}

	return deposits
}
