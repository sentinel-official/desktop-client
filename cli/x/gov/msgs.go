package gov

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/gov"
	gcutils "github.com/cosmos/cosmos-sdk/x/gov/client/utils"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type MsgSubmitProposal struct {
	FromAddress    string      `json:"from_address"`
	Title          string      `json:"title"`
	Description    string      `json:"description"`
	Type           string      `json:"type"`
	InitialDeposit other.Coins `json:"initial_deposit"`
}

func NewMsgSubmitProposal(fromAddress, title, description, _type string, deposit other.Coins) *MsgSubmitProposal {
	return &MsgSubmitProposal{
		FromAddress:    fromAddress,
		Title:          title,
		Description:    description,
		Type:           _type,
		InitialDeposit: deposit,
	}
}

func (p *MsgSubmitProposal) Raw() (proposal gov.MsgSubmitProposal, err error) {
	proposal.Proposer, err = sdk.AccAddressFromHex(p.FromAddress)
	if err != nil {
		return proposal, err
	}

	proposal.Content = gov.ContentFromProposalType(p.Title, p.Description, p.Type)
	proposal.InitialDeposit = p.InitialDeposit.Raw()

	return proposal, nil
}

type MsgDeposit struct {
	FromAddress string      `json:"from_address"`
	ProposalID  uint64      `json:"proposal_id"`
	Amount      other.Coins `json:"amount"`
}

func NewMsgDeposit(fromAddress string, proposalID uint64, deposit other.Coins) *MsgDeposit {
	return &MsgDeposit{
		FromAddress: fromAddress,
		ProposalID:  proposalID,
		Amount:      deposit,
	}
}

func (p *MsgDeposit) Raw() (deposit gov.MsgDeposit, err error) {
	deposit.Depositor, err = sdk.AccAddressFromHex(p.FromAddress)
	if err != nil {
		return deposit, err
	}

	deposit.ProposalID = p.ProposalID
	deposit.Amount = p.Amount.Raw()

	return deposit, nil
}

type MsgVote struct {
	FromAddress string `json:"from_address"`
	ProposalID  uint64 `json:"proposal_id"`
	Option      string `json:"option"`
}

func NewMsgVote(fromAddress string, proposalID uint64, option string) *MsgVote {
	return &MsgVote{
		FromAddress: fromAddress,
		ProposalID:  proposalID,
		Option:      option,
	}
}

func (p *MsgVote) Raw() (vote gov.MsgVote, err error) {
	vote.Voter, err = sdk.AccAddressFromHex(p.FromAddress)
	if err != nil {
		return vote, err
	}

	option, err := gov.VoteOptionFromString(gcutils.NormalizeVoteOption(p.Option))
	if err != nil {
		return vote, err
	}

	vote.ProposalID = p.ProposalID
	vote.Option = option

	return vote, nil
}
