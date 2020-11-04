package models

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Coin struct {
	Denom string `json:"denom"`
	Value int64  `json:"value"`
}

func NewCoinFromRaw(c sdk.Coin) Coin {
	return Coin{
		Denom: c.Denom,
		Value: c.Amount.Int64(),
	}
}

func (c *Coin) Raw() sdk.Coin {
	return sdk.Coin{
		Denom:  c.Denom,
		Amount: sdk.NewInt(c.Value),
	}
}

type Coins []Coin

func NewCoinsFromRaw(c sdk.Coins) Coins {
	coins := make(Coins, 0, c.Len())
	for _, coin := range c {
		coins = append(coins, NewCoinFromRaw(coin))
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

func NewDecCoinFromRaw(c sdk.DecCoin) DecCoin {
	return DecCoin{
		Denom: c.Denom,
		Value: c.Amount.String(),
	}
}

func (c *DecCoin) Raw() sdk.DecCoin {
	return sdk.DecCoin{
		Denom:  c.Denom,
		Amount: sdk.Dec{},
	}
}

type DecCoins []DecCoin

func NewDecCoinsFromRaw(c sdk.DecCoins) DecCoins {
	coins := make(DecCoins, 0, c.Len())
	for _, coin := range c {
		coins = append(coins, NewDecCoinFromRaw(coin))
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
