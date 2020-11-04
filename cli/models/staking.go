package models

import (
	"time"

	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/tendermint/tendermint/libs/common"
)

type Validator struct {
	Address          string `json:"address"`
	PubKey           string `json:"pub_key"`
	ConsensusAddress string `json:"consensus_address"`
	ConsensusPubKey  string `json:"consensus_pub_key"`

	Description ValidatorDescription `json:"description"`
	Commission  ValidatorCommission  `json:"commission"`

	Jailed     bool   `json:"jailed"`
	BondStatus string `json:"bond_status"`

	Amount            Coin   `json:"amount"`
	DelegatorShares   string `json:"delegator_shares"`
	MinSelfDelegation int64  `json:"min_self_delegation"`

	UnbondingHeight         int64     `json:"unbonding_height"`
	UnbondingCompletionTime time.Time `json:"unbonding_completion_time"`
}

type ValidatorDescription struct {
	Moniker  string `json:"moniker"`
	Identity string `json:"identity"`
	Website  string `json:"website"`
	Details  string `json:"details"`
}

type ValidatorCommission struct {
	Rate          string    `json:"rate"`
	MaxRate       string    `json:"max_rate"`
	MaxChangeRate string    `json:"max_change_rate"`
	UpdatedAt     time.Time `json:"updated_at"`
}

func NewValidatorFromRaw(v staking.Validator) Validator {
	return Validator{
		Address:          common.HexBytes(v.OperatorAddress.Bytes()).String(),
		PubKey:           "",
		ConsensusAddress: common.HexBytes(v.ConsPubKey.Address().Bytes()).String(),
		ConsensusPubKey:  common.HexBytes(v.ConsPubKey.Bytes()).String(),
		Description: ValidatorDescription{
			Moniker:  v.Description.Moniker,
			Identity: v.Description.Identity,
			Website:  v.Description.Website,
			Details:  v.Description.Details,
		},
		Commission: ValidatorCommission{
			Rate:          v.Commission.Rate.String(),
			MaxRate:       v.Commission.MaxRate.String(),
			MaxChangeRate: v.Commission.MaxChangeRate.String(),
			UpdatedAt:     v.Commission.UpdateTime,
		},
		Jailed:     v.Jailed,
		BondStatus: v.Status.String(),
		Amount: Coin{
			Denom: "",
			Value: v.Tokens.Int64(),
		},
		DelegatorShares:         v.DelegatorShares.String(),
		MinSelfDelegation:       v.MinSelfDelegation.Int64(),
		UnbondingHeight:         v.UnbondingHeight,
		UnbondingCompletionTime: v.UnbondingCompletionTime,
	}
}

type Validators []Validator

func NewValidatorsFromRaw(validators staking.Validators) Validators {
	var _validators Validators
	for _, validator := range validators {
		_validators = append(_validators, NewValidatorFromRaw(validator))
	}

	return _validators
}

type Delegation struct {
	DelegatorAddress string `json:"delegator_address"`
	ValidatorAddress string `json:"validator_address"`
	Shares           string `json:"shares"`
}

func NewDelegationFromRaw(delegation staking.Delegation) Delegation {
	return Delegation{
		DelegatorAddress: common.HexBytes(delegation.DelegatorAddress.Bytes()).String(),
		ValidatorAddress: common.HexBytes(delegation.ValidatorAddress.Bytes()).String(),
		Shares:           delegation.Shares.String(),
	}
}

type Delegations []Delegation

func NewDelegationsFromRaw(delegations staking.Delegations) Delegations {
	var _delegations Delegations
	for _, delegation := range delegations {
		_delegations = append(_delegations, NewDelegationFromRaw(delegation))
	}
	return _delegations
}
