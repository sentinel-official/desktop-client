package staking

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/staking"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type MsgDelegate struct {
	FromAddress string     `json:"from_address"`
	ValAddress  string     `json:"val_address"`
	Amount      other.Coin `json:"amount"`
}

func NewMsgDelegate(fromAddress, valAddress string, amount other.Coin) *MsgDelegate {
	return &MsgDelegate{
		FromAddress: fromAddress,
		ValAddress:  valAddress,
		Amount:      amount,
	}
}

func (d *MsgDelegate) Raw() (delegate staking.MsgDelegate, err error) {
	delegate.DelegatorAddress, err = sdk.AccAddressFromHex(d.FromAddress)
	if err != nil {
		return delegate, err
	}

	delegate.ValidatorAddress, err = sdk.ValAddressFromHex(d.ValAddress)
	if err != nil {
		return delegate, err
	}

	delegate.Amount = d.Amount.Raw()

	return delegate, nil
}

type MsgBeginRedelegate struct {
	FromAddress   string     `json:"from_address"`
	ValSrcAddress string     `json:"val_src_address"`
	ValDstAddress string     `json:"val_dest_address"`
	Amount        other.Coin `json:"amount"`
}

func NewMsgBeginRedelegate(fromAddress, valSrcAddress, valDstAddress string, amount other.Coin) *MsgBeginRedelegate {
	return &MsgBeginRedelegate{
		FromAddress:   fromAddress,
		ValSrcAddress: valSrcAddress,
		ValDstAddress: valDstAddress,
		Amount:        amount,
	}
}

func (d *MsgBeginRedelegate) Raw() (reDelegate staking.MsgBeginRedelegate, err error) {
	reDelegate.DelegatorAddress, err = sdk.AccAddressFromHex(d.FromAddress)
	if err != nil {
		return reDelegate, err
	}

	reDelegate.ValidatorSrcAddress, err = sdk.ValAddressFromHex(d.ValSrcAddress)
	if err != nil {
		return reDelegate, err
	}

	reDelegate.ValidatorDstAddress, err = sdk.ValAddressFromHex(d.ValDstAddress)
	if err != nil {
		return reDelegate, err
	}

	reDelegate.Amount = d.Amount.Raw()

	return reDelegate, nil
}

type MsgUndelegate struct {
	FromAddress string     `json:"from_address"`
	ValAddress  string     `json:"val_address"`
	Amount      other.Coin `json:"amount"`
}

func NewMsgUndelegate(fromAddress, valAddress string, amount other.Coin) *MsgUndelegate {
	return &MsgUndelegate{
		FromAddress: fromAddress,
		ValAddress:  valAddress,
		Amount:      amount,
	}
}

func (d *MsgUndelegate) Raw() (undelegate staking.MsgUndelegate, err error) {
	undelegate.DelegatorAddress, err = sdk.AccAddressFromHex(d.FromAddress)
	if err != nil {
		return undelegate, err
	}

	undelegate.ValidatorAddress, err = sdk.ValAddressFromHex(d.ValAddress)
	if err != nil {
		return undelegate, err
	}

	undelegate.Amount = d.Amount.Raw()

	return undelegate, nil
}
