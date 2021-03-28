package bank

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type MsgSend struct {
	FromAddress string      `json:"from_address"`
	ToAddress   string      `json:"to_address"`
	Amount      other.Coins `json:"amount"`
}

func NewMsgSend(fromAddress, toAddress string, amount other.Coins) *MsgSend {
	return &MsgSend{
		FromAddress: fromAddress,
		ToAddress:   toAddress,
		Amount:      amount,
	}
}

func (s *MsgSend) Raw() (send bank.MsgSend, err error) {
	send.FromAddress, err = sdk.AccAddressFromHex(s.FromAddress)
	if err != nil {
		return send, err
	}

	send.ToAddress, err = sdk.AccAddressFromHex(s.ToAddress)
	if err != nil {
		return send, err
	}

	send.Amount = s.Amount.Raw()

	return send, nil
}
