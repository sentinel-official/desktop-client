package messages

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/gov"
	gcutils "github.com/cosmos/cosmos-sdk/x/gov/client/utils"
	"github.com/tendermint/tendermint/libs/common"

	"github.com/sentinel-official/desktop-client/cli/models"
)

type Proposal struct {
	FromAddress    string       `json:"from_address"`
	Title          string       `json:"title"`
	Description    string       `json:"description"`
	Type           string       `json:"type"`
	InitialDeposit models.Coins `json:"initial_deposit"`
}

func NewProposal(fromAddress, title, description, _type string, deposit models.Coins) *Proposal {
	return &Proposal{
		FromAddress:    fromAddress,
		Title:          title,
		Description:    description,
		Type:           _type,
		InitialDeposit: deposit,
	}
}

func NewProposalFromRaw(m *gov.MsgSubmitProposal) *Proposal {
	return &Proposal{
		FromAddress:    common.HexBytes(m.Proposer.Bytes()).String(),
		Title:          m.Content.GetTitle(),
		Description:    m.Content.GetDescription(),
		Type:           m.Content.ProposalType(),
		InitialDeposit: models.NewCoinsFromRaw(m.InitialDeposit),
	}
}

func (p *Proposal) Raw() (proposal gov.MsgSubmitProposal, err error) {
	proposal.Proposer, err = sdk.AccAddressFromHex(p.FromAddress)
	if err != nil {
		return proposal, err
	}

	proposal.Content = gov.ContentFromProposalType(p.Title, p.Description, p.Type)
	proposal.InitialDeposit = p.InitialDeposit.Raw()

	return proposal, nil
}

type ProposalDeposits struct {
	FromAddress string       `json:"from_address"`
	ProposalID  uint64       `json:"proposal_id"`
	Amount      models.Coins `json:"amount"`
}

func NewProposalDeposits(fromAddress string, proposalID uint64, deposit models.Coins) *ProposalDeposits {
	return &ProposalDeposits{
		FromAddress: fromAddress,
		ProposalID:  proposalID,
		Amount:      deposit,
	}
}

func NewProposalDepositsFromRaw(m *gov.MsgDeposit) *ProposalDeposits {
	return &ProposalDeposits{
		FromAddress: common.HexBytes(m.Depositor.Bytes()).String(),
		ProposalID:  m.ProposalID,
		Amount:      models.NewCoinsFromRaw(m.Amount),
	}
}

func (p *ProposalDeposits) Raw() (deposit gov.MsgDeposit, err error) {
	deposit.Depositor, err = sdk.AccAddressFromHex(p.FromAddress)
	if err != nil {
		return deposit, err
	}

	deposit.ProposalID = p.ProposalID
	deposit.Amount = p.Amount.Raw()

	return deposit, nil
}

type ProposalVotes struct {
	FromAddress string `json:"from_address"`
	ProposalID  uint64 `json:"proposal_id"`
	Option      string `json:"option"`
}

func NewProposalVotes(fromAddress string, proposalID uint64, option string) *ProposalVotes {
	return &ProposalVotes{
		FromAddress: fromAddress,
		ProposalID:  proposalID,
		Option:      option,
	}
}

func NewProposalVotesFromRaw(m *gov.MsgVote) *ProposalVotes {
	return &ProposalVotes{
		FromAddress: common.HexBytes(m.Voter.Bytes()).String(),
		ProposalID:  m.ProposalID,
		Option:      m.Option.String(),
	}
}

func (p *ProposalVotes) Raw() (vote gov.MsgVote, err error) {
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
