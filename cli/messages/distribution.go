package messages

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/distribution"
	"github.com/tendermint/tendermint/libs/common"
)

type WithdrawRewards struct {
	FromAddress string `json:"from_address"`
	ValAddress  string `json:"val_address"`
}

func NewWithdrawRewards(fromAddress, valAddress string) *WithdrawRewards {
	return &WithdrawRewards{
		FromAddress: fromAddress,
		ValAddress:  valAddress,
	}
}

func NewWithdrawRewardsFromRaw(m *distribution.MsgWithdrawDelegatorReward) *WithdrawRewards {
	return &WithdrawRewards{
		FromAddress: common.HexBytes(m.DelegatorAddress.Bytes()).String(),
		ValAddress:  common.HexBytes(m.ValidatorAddress).String(),
	}
}

func (w *WithdrawRewards) Raw() (rewards distribution.MsgWithdrawDelegatorReward, err error) {
	rewards.DelegatorAddress, err = sdk.AccAddressFromHex(w.FromAddress)
	if err != nil {
		return rewards, err
	}

	rewards.ValidatorAddress, err = sdk.ValAddressFromHex(w.ValAddress)
	if err != nil {
		return rewards, err
	}

	return rewards, nil
}
