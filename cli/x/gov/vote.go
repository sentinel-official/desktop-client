package gov

import (
	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/tendermint/tendermint/libs/bytes"
)

type Vote struct {
	ProposalID uint64 `json:"proposal_id"`
	Voter      string `json:"voter"`
	Option     string `json:"option"`
}

func NewVoteFromRaw(vote gov.Vote) Vote {
	return Vote{
		ProposalID: vote.ProposalID,
		Voter:      bytes.HexBytes(vote.Voter.Bytes()).String(),
		Option:     vote.Option.String(),
	}
}

type Votes []Vote

func NewVotesFromRaw(items gov.Votes) Votes {
	votes := make(Votes, 0, len(items))
	for _, item := range items {
		votes = append(votes, NewVoteFromRaw(item))
	}

	return votes
}
