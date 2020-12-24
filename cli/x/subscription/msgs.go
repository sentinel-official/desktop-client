package subscription

import (
	"encoding/hex"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/sentinel-official/hub/x/subscription"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type MsgSubscribeToPlan struct {
	From  string `json:"from"`
	ID    uint64 `json:"id"`
	Denom string `json:"denom"`
}

func NewMsgSubscribeToPlan(from string, id uint64, denom string) *MsgSubscribeToPlan {
	return &MsgSubscribeToPlan{
		From:  from,
		ID:    id,
		Denom: denom,
	}
}

func (m *MsgSubscribeToPlan) Raw() (msg subscription.MsgSubscribeToPlan, err error) {
	msg.From, err = sdk.AccAddressFromHex(m.From)
	if err != nil {
		return msg, err
	}

	msg.ID = m.ID
	msg.Denom = m.Denom

	return msg, nil
}

type MsgSubscribeToNode struct {
	From    string     `json:"from"`
	Address string     `json:"address"`
	Deposit other.Coin `json:"deposit"`
}

func NewMsgSubscribeToNode(from, address string, deposit other.Coin) *MsgSubscribeToNode {
	return &MsgSubscribeToNode{
		From:    from,
		Address: address,
		Deposit: deposit,
	}
}

func (m *MsgSubscribeToNode) Raw() (msg subscription.MsgSubscribeToNode, err error) {
	msg.From, err = sdk.AccAddressFromHex(m.From)
	if err != nil {
		return msg, err
	}

	msg.Address, err = hex.DecodeString(m.Address)
	if err != nil {
		return msg, err
	}

	msg.Deposit = m.Deposit.Raw()

	return msg, nil
}

type MsgCancel struct {
	From string `json:"from"`
	ID   uint64 `json:"id"`
}

func NewMsgCancel(from string, id uint64) *MsgCancel {
	return &MsgCancel{
		From: from,
		ID:   id,
	}
}

func (m *MsgCancel) Raw() (msg subscription.MsgCancel, err error) {
	msg.From, err = sdk.AccAddressFromHex(m.From)
	if err != nil {
		return msg, err
	}

	msg.ID = m.ID

	return msg, nil
}
