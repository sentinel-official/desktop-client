package other

import (
	"github.com/sentinel-official/hub/x/deposit"
	"github.com/tendermint/tendermint/libs/bytes"
)

type Deposit struct {
	Address string `json:"address"`
	Amount  []Coin `json:"amount"`
}

func NewDepositFromRaw(item deposit.Deposit) Deposit {
	return Deposit{
		Address: bytes.HexBytes(item.Address.Bytes()).String(),
		Amount:  NewCoinsFromRaw(item.Coins),
	}
}

type Deposits []Deposit

func NewDepositsFromRaw(items deposit.Deposits) Deposits {
	deposits := make(Deposits, 0, len(items))
	for _, item := range items {
		deposits = append(deposits, NewDepositFromRaw(item))
	}

	return deposits
}
