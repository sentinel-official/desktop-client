package staking

import (
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type Delegation struct {
	DelegatorAddress string      `json:"delegator_address"`
	ValidatorAddress string      `json:"validator_address"`
	Shares           string      `json:"shares"`
	Balance          common.Coin `json:"balance"`
}

func NewDelegationFromRaw(item stakingtypes.DelegationResponse) Delegation {
	return Delegation{
		DelegatorAddress: item.Delegation.DelegatorAddress,
		ValidatorAddress: item.Delegation.ValidatorAddress,
		Shares:           item.Delegation.Shares.String(),
		Balance:          common.NewCoinFromRaw(&item.Balance),
	}
}

type Delegations []Delegation

func NewDelegationsFromRaw(items stakingtypes.DelegationResponses) Delegations {
	delegations := make(Delegations, 0, len(items))
	for _, item := range items {
		delegations = append(delegations, NewDelegationFromRaw(item))
	}

	return delegations
}
