package gov

import (
	"time"

	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type TallyResult struct {
	Yes        int64 `json:"yes"`
	Abstain    int64 `json:"abstain"`
	No         int64 `json:"no"`
	NoWithVeto int64 `json:"no_with_veto"`
}

type Content struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Route       string `json:"route"`
	Type        string `json:"type"`
}

type Proposal struct {
	Id              uint64       `json:"id"`
	Status          string       `json:"status"`
	Content         Content      `json:"content"`
	TallyResult     TallyResult  `json:"tally_result"`
	TotalDeposit    common.Coins `json:"total_deposit"`
	SubmitTime      time.Time    `json:"submit_time"`
	DepositEndTime  time.Time    `json:"deposit_end_time"`
	VotingStartTime time.Time    `json:"voting_start_time"`
	VotingEndTime   time.Time    `json:"voting_end_time"`
}

func NewProposalFromRaw(item *govtypes.Proposal) Proposal {
	return Proposal{
		Id:     item.ProposalId,
		Status: item.Status.String(),
		Content: Content{
			Title:       item.GetContent().GetTitle(),
			Description: item.GetContent().GetDescription(),
			Route:       item.GetContent().ProposalRoute(),
			Type:        item.GetContent().ProposalType(),
		},
		TallyResult: TallyResult{
			Yes:        item.FinalTallyResult.Yes.Int64(),
			Abstain:    item.FinalTallyResult.Abstain.Int64(),
			No:         item.FinalTallyResult.No.Int64(),
			NoWithVeto: item.FinalTallyResult.NoWithVeto.Int64(),
		},
		TotalDeposit:    common.NewCoinsFromRaw(item.TotalDeposit),
		SubmitTime:      item.SubmitTime,
		DepositEndTime:  item.DepositEndTime,
		VotingStartTime: item.VotingStartTime,
		VotingEndTime:   item.VotingEndTime,
	}
}

type Proposals []Proposal

func NewProposalsFromRaw(items govtypes.Proposals) Proposals {
	proposals := make(Proposals, 0, len(items))
	for i := range items {
		proposals = append(proposals, NewProposalFromRaw(&items[i]))
	}

	return proposals
}

func NewDepositFromRaw(deposit *govtypes.Deposit) common.Deposit {
	return common.Deposit{
		Address: deposit.Depositor,
		Amount:  common.NewCoinsFromRaw(deposit.Amount),
	}
}

func NewDepositsFromRaw(items govtypes.Deposits) common.Deposits {
	deposits := make(common.Deposits, 0, len(items))
	for i := range items {
		deposits = append(deposits, NewDepositFromRaw(&items[i]))
	}

	return deposits
}
