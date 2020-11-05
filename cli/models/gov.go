package models

import (
	"time"

	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/tendermint/tendermint/libs/common"
)

type TallyResult struct {
	Yes        int64 `json:"yes"`
	Abstain    int64 `json:"abstain"`
	No         int64 `json:"no"`
	NoWithVeto int64 `json:"no_with_veto"`
}

type Proposal struct {
	Index           uint64      `json:"index"`
	Type            string      `json:"type"`
	Title           string      `json:"title"`
	Description     string      `json:"description"`
	Status          string      `json:"status"`
	TallyResult     TallyResult `json:"tally_result"`
	SubmitTime      time.Time   `json:"submit_time"`
	DepositEndTime  time.Time   `json:"deposit_end_time"`
	VotingStartTime time.Time   `json:"voting_start_time"`
	VotingEndTime   time.Time   `json:"voting_end_time"`
}

func NewProposalFromRaw(p gov.Proposal) Proposal {
	return Proposal{
		Index:       p.ProposalID,
		Type:        p.ProposalType(),
		Title:       p.GetTitle(),
		Description: p.GetDescription(),
		Status:      p.Status.String(),
		TallyResult: TallyResult{
			Yes:        p.FinalTallyResult.Yes.Int64(),
			Abstain:    p.FinalTallyResult.Abstain.Int64(),
			No:         p.FinalTallyResult.No.Int64(),
			NoWithVeto: p.FinalTallyResult.NoWithVeto.Int64(),
		},
		SubmitTime:      p.SubmitTime,
		DepositEndTime:  p.DepositEndTime,
		VotingStartTime: p.VotingStartTime,
		VotingEndTime:   p.VotingEndTime,
	}
}

type Proposals []Proposal

func NewProposalsFromRaw(proposals gov.Proposals) Proposals {
	_proposals := make(Proposals, 0, len(proposals))
	for _, proposal := range proposals {
		_proposals = append(_proposals, NewProposalFromRaw(proposal))
	}

	return _proposals
}

type Deposit struct {
	Address string `json:"address"`
	Amount  []Coin `json:"amount"`
}

func NewDepositFromRaw(deposit gov.Deposit) Deposit {
	return Deposit{
		Address: common.HexBytes(deposit.Depositor.Bytes()).String(),
		Amount:  NewCoinsFromRaw(deposit.Amount),
	}
}

type Deposits []Deposit

func NewDepositsFromRaw(deposits gov.Deposits) Deposits {
	_deposits := make(Deposits, 0, len(deposits))
	for _, deposit := range deposits {
		_deposits = append(_deposits, NewDepositFromRaw(deposit))
	}

	return _deposits
}

type Vote struct {
	ProposalID   uint64 `json:"proposal_id"`
	VoterAddress string `json:"voter_address"`
	Option       string `json:"option"`
}

func NewVoteFromRaw(vote gov.Vote) Vote {
	return Vote{
		ProposalID:   vote.ProposalID,
		VoterAddress: common.HexBytes(vote.Voter.Bytes()).String(),
		Option:       vote.Option.String(),
	}
}

type Votes []Vote

func NewVotesFromRaw(votes gov.Votes) Votes {
	_votes := make(Votes, 0, len(votes))
	for _, vote := range votes {
		_votes = append(_votes, NewVoteFromRaw(vote))
	}

	return _votes
}
