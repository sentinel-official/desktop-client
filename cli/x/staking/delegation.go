package staking

import (
	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/tendermint/tendermint/libs/bytes"
)

type Delegation struct {
	DelegatorAddress string `json:"delegator_address"`
	ValidatorAddress string `json:"validator_address"`
	Shares           string `json:"shares"`
}

func NewDelegationFromRaw(delegation staking.Delegation) Delegation {
	return Delegation{
		DelegatorAddress: bytes.HexBytes(delegation.DelegatorAddress.Bytes()).String(),
		ValidatorAddress: bytes.HexBytes(delegation.ValidatorAddress.Bytes()).String(),
		Shares:           delegation.Shares.String(),
	}
}

type Delegations []Delegation

func NewDelegationsFromRaw(items staking.Delegations) Delegations {
	delegations := make(Delegations, 0, len(items))
	for _, item := range items {
		delegations = append(delegations, NewDelegationFromRaw(item))
	}
	return delegations
}
