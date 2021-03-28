package distribution

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/distribution"
)

type MsgWithdrawDelegatorReward struct {
	FromAddress string `json:"from_address"`
	ValAddress  string `json:"val_address"`
}

func NewMsgWithdrawDelegatorReward(fromAddress, valAddress string) *MsgWithdrawDelegatorReward {
	return &MsgWithdrawDelegatorReward{
		FromAddress: fromAddress,
		ValAddress:  valAddress,
	}
}

func (w *MsgWithdrawDelegatorReward) Raw() (rewards distribution.MsgWithdrawDelegatorReward, err error) {
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
