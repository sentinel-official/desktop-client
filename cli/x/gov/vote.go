package gov

import (
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
)

type Vote struct {
	ProposalId uint64 `json:"proposal_id"`
	Voter      string `json:"voter"`
	Option     string `json:"option"`
}

func NewVoteFromRaw(vote *govtypes.Vote) Vote {
	return Vote{
		ProposalId: vote.ProposalId,
		Voter:      vote.Voter,
		Option:     vote.Option.String(),
	}
}

type Votes []Vote

func NewVotesFromRaw(items govtypes.Votes) Votes {
	votes := make(Votes, 0, len(items))
	for _, item := range items {
		votes = append(votes, NewVoteFromRaw(&item))
	}

	return votes
}
