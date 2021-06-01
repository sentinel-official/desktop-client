package common

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Coin struct {
	Denom string `json:"denom"`
	Value int64  `json:"value"`
}

func NewCoinFromRaw(item *sdk.Coin) Coin {
	return Coin{
		Denom: item.Denom,
		Value: item.Amount.Int64(),
	}
}

func (c *Coin) Raw() sdk.Coin {
	return sdk.Coin{
		Denom:  c.Denom,
		Amount: sdk.NewInt(c.Value),
	}
}

type Coins []Coin

func NewCoinsFromRaw(items sdk.Coins) Coins {
	coins := make(Coins, 0, items.Len())
	for i := range items {
		coins = append(coins, NewCoinFromRaw(&items[i]))
	}

	return coins
}

func (c Coins) Raw() sdk.Coins {
	coins := make(sdk.Coins, 0, len(c))
	for _, coin := range c {
		coins = append(coins, coin.Raw())
	}

	return coins
}

type DecCoin struct {
	Denom string `json:"denom"`
	Value string `json:"value"`
}

func NewDecCoinFromRaw(item *sdk.DecCoin) DecCoin {
	return DecCoin{
		Denom: item.Denom,
		Value: item.Amount.String(),
	}
}

func (c *DecCoin) Raw() sdk.DecCoin {
	return sdk.DecCoin{
		Denom:  c.Denom,
		Amount: sdk.Dec{},
	}
}

type DecCoins []DecCoin

func NewDecCoinsFromRaw(items sdk.DecCoins) DecCoins {
	coins := make(DecCoins, 0, items.Len())
	for i := range items {
		coins = append(coins, NewDecCoinFromRaw(&items[i]))
	}

	return coins
}

func (c DecCoins) Raw() sdk.DecCoins {
	coins := make(sdk.DecCoins, 0, len(c))
	for _, coin := range c {
		coins = append(coins, coin.Raw())
	}

	return coins
}
