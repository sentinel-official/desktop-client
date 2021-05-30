package auth

import (
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type Account struct {
	Address  string      `json:"address"`
	PubKey   string      `json:"pub_key"`
	Balance  common.Coin `json:"balance"`
	Sequence uint64      `json:"sequence"`
	Number   uint64      `json:"number"`
}

func (a Account) WithBalance(balance common.Coin) Account {
	a.Balance = balance
	return a
}

func NewAccountFromRaw(item authtypes.AccountI) Account {
	if item == nil {
		return Account{}
	}

	return Account{
		Address: item.GetAddress().String(),
		PubKey: func() string {
			if item.GetPubKey() == nil {
				return ""
			}

			return item.GetPubKey().String()
		}(),
		Sequence: item.GetSequence(),
		Number:   item.GetAccountNumber(),
	}
}
