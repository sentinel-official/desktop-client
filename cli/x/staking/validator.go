package staking

import (
	"time"

	"github.com/cosmos/cosmos-sdk/x/staking"
	"github.com/tendermint/tendermint/libs/common"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type Description struct {
	Moniker  string `json:"moniker"`
	Identity string `json:"identity"`
	Website  string `json:"website"`
	Details  string `json:"details"`
}

type Commission struct {
	Rate          string    `json:"rate"`
	MaxRate       string    `json:"max_rate"`
	MaxChangeRate string    `json:"max_change_rate"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type Validator struct {
	Address          string `json:"address"`
	PubKey           string `json:"pub_key"`
	ConsensusAddress string `json:"consensus_address"`
	ConsensusPubKey  string `json:"consensus_pub_key"`

	Description Description `json:"description"`
	Commission  Commission  `json:"commission"`

	Jailed     bool   `json:"jailed"`
	BondStatus string `json:"bond_status"`

	Amount            other.Coin `json:"amount"`
	DelegatorShares   string     `json:"delegator_shares"`
	MinSelfDelegation int64      `json:"min_self_delegation"`

	UnbondingHeight         int64     `json:"unbonding_height"`
	UnbondingCompletionTime time.Time `json:"unbonding_completion_time"`
}

func NewValidatorFromRaw(v staking.Validator) Validator {
	return Validator{
		Address:          common.HexBytes(v.OperatorAddress.Bytes()).String(),
		PubKey:           "",
		ConsensusAddress: common.HexBytes(v.ConsPubKey.Address().Bytes()).String(),
		ConsensusPubKey:  common.HexBytes(v.ConsPubKey.Bytes()).String(),
		Description: Description{
			Moniker:  v.Description.Moniker,
			Identity: v.Description.Identity,
			Website:  v.Description.Website,
			Details:  v.Description.Details,
		},
		Commission: Commission{
			Rate:          v.Commission.Rate.String(),
			MaxRate:       v.Commission.MaxRate.String(),
			MaxChangeRate: v.Commission.MaxChangeRate.String(),
			UpdatedAt:     v.Commission.UpdateTime,
		},
		Jailed:     v.Jailed,
		BondStatus: v.Status.String(),
		Amount: other.Coin{
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

func NewValidatorsFromRaw(items staking.Validators) Validators {
	validators := make(Validators, 0, len(items))
	for _, item := range items {
		validators = append(validators, NewValidatorFromRaw(item))
	}

	return validators
}
