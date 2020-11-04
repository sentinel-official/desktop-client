package models

import (
	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/tendermint/tendermint/libs/common"
)

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
	var _votes Votes
	for _, vote := range votes {
		_votes = append(_votes, NewVoteFromRaw(vote))
	}

	return _votes
}
