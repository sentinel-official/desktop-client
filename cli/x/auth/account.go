package auth

import (
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/tendermint/tendermint/libs/common"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type Account struct {
	Address  string      `json:"address"`
	PubKey   string      `json:"pub_key"`
	Coins    other.Coins `json:"coins"`
	Sequence uint64      `json:"sequence"`
	Number   uint64      `json:"number"`
}

func NewAccountFromRaw(item auth.Account) (account Account) {
	if item == nil {
		return Account{
			Coins: other.Coins{other.Coin{Denom: "", Value: 0}},
		}
	}

	if item.GetPubKey() == nil {
		account.PubKey = ""
	} else {
		account.PubKey = common.HexBytes(item.GetPubKey().Bytes()).String()
	}

	account.Address = common.HexBytes(item.GetAddress().Bytes()).String()
	account.Coins = other.NewCoinsFromRaw(item.GetCoins())
	account.Sequence = item.GetSequence()
	account.Number = item.GetAccountNumber()

	return account
}
