package models

import (
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/tendermint/tendermint/libs/common"
)

type Account struct {
	Address  string `json:"address"`
	PubKey   string `json:"pub_key"`
	Coins    Coins  `json:"coins"`
	Sequence uint64 `json:"sequence"`
	Number   uint64 `json:"number"`
}

func NewAccountFromRaw(a auth.Account) (account Account) {
	if a == nil {
		return Account{
			Coins: Coins{Coin{Denom: "", Value: 0}},
		}
	}

	if a.GetPubKey() == nil {
		account.PubKey = ""
	} else {
		account.PubKey = common.HexBytes(a.GetPubKey().Bytes()).String()
	}

	account.Address = common.HexBytes(a.GetAddress().Bytes()).String()
	account.Coins = NewCoinsFromRaw(a.GetCoins())
	account.Sequence = a.GetSequence()
	account.Number = a.GetAccountNumber()

	return account
}
