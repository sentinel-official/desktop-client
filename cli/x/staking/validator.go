package staking

import (
	"time"

	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/tendermint/tendermint/libs/bytes"
)

type Description struct {
	Moniker         string `json:"moniker"`
	Identity        string `json:"identity"`
	Website         string `json:"website"`
	SecurityContact string `json:"security_contact"`
	Details         string `json:"details"`
}

type Commission struct {
	Rate          string    `json:"rate"`
	MaxRate       string    `json:"max_rate"`
	MaxChangeRate string    `json:"max_change_rate"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type Validator struct {
	OperatorAddress   string      `json:"operator_address"`
	ConsensusPubKey   string      `json:"consensus_pub_key"`
	Jailed            bool        `json:"jailed"`
	Status            string      `json:"status"`
	Tokens            int64       `json:"tokens"`
	DelegatorShares   string      `json:"delegator_shares"`
	Description       Description `json:"description"`
	UnbondingHeight   int64       `json:"unbonding_height"`
	UnbondingTime     time.Time   `json:"unbonding_time"`
	Commission        Commission  `json:"commission"`
	MinSelfDelegation int64       `json:"min_self_delegation"`
	ConsensusPower    int64       `json:"consensus_power"`
}

func NewValidatorFromRaw(item *stakingtypes.Validator) Validator {
	if item == nil {
		return Validator{}
	}

	return Validator{
		OperatorAddress: item.OperatorAddress,
		ConsensusPubKey: bytes.HexBytes(item.ConsensusPubkey.GetValue()).String(),
		Jailed:          item.Jailed,
		Status:          item.Status.String(),
		Tokens:          item.Tokens.Int64(),
		DelegatorShares: item.DelegatorShares.String(),
		Description: Description{
			Moniker:         item.Description.Moniker,
			Identity:        item.Description.Identity,
			Website:         item.Description.Website,
			SecurityContact: item.Description.SecurityContact,
			Details:         item.Description.Details,
		},
		UnbondingHeight: item.UnbondingHeight,
		UnbondingTime:   item.UnbondingTime,
		Commission: Commission{
			Rate:          item.Commission.Rate.String(),
			MaxRate:       item.Commission.MaxRate.String(),
			MaxChangeRate: item.Commission.MaxChangeRate.String(),
			UpdatedAt:     item.Commission.UpdateTime,
		},
		MinSelfDelegation: item.MinSelfDelegation.Int64(),
		ConsensusPower:    item.ConsensusPower(),
	}
}

type Validators []Validator

func NewValidatorsFromRaw(items stakingtypes.Validators) Validators {
	validators := make(Validators, 0, len(items))
	for i := range items {
		validators = append(validators, NewValidatorFromRaw(&items[i]))
	}

	return validators
}
