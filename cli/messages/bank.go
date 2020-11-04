package messages

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/bank"
	"github.com/tendermint/tendermint/libs/common"

	"github.com/sentinel-official/desktop-client/cli/models"
)

type Send struct {
	FromAddress string       `json:"from_address"`
	ToAddress   string       `json:"to_address"`
	Amount      models.Coins `json:"amount"`
}

func NewSend(fromAddress, toAddress string, amount models.Coins) *Send {
	return &Send{
		FromAddress: fromAddress,
		ToAddress:   toAddress,
		Amount:      amount,
	}
}

func NewSendFromRaw(m *bank.MsgSend) *Send {
	return &Send{
		FromAddress: common.HexBytes(m.FromAddress.Bytes()).String(),
		ToAddress:   common.HexBytes(m.ToAddress).String(),
		Amount:      models.NewCoinsFromRaw(m.Amount),
	}
}

func (s *Send) Raw() (send bank.MsgSend, err error) {
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
