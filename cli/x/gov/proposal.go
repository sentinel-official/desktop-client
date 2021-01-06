package gov

import (
	"time"

	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/tendermint/tendermint/libs/common"

	"github.com/sentinel-official/desktop-client/cli/x/other"
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
	Deposit         other.Coins `json:"deposit"`
	TallyResult     TallyResult `json:"tally_result"`
	SubmitTime      time.Time   `json:"submit_time"`
	DepositEndTime  time.Time   `json:"deposit_end_time"`
	VotingStartTime time.Time   `json:"voting_start_time"`
	VotingEndTime   time.Time   `json:"voting_end_time"`
}

func NewProposalFromRaw(item gov.Proposal) Proposal {
	return Proposal{
		Index:       item.ProposalID,
		Type:        item.ProposalType(),
		Title:       item.GetTitle(),
		Description: item.GetDescription(),
		Status:      item.Status.String(),
		Deposit:     other.NewCoinsFromRaw(item.TotalDeposit),
		TallyResult: TallyResult{
			Yes:        item.FinalTallyResult.Yes.Int64(),
			Abstain:    item.FinalTallyResult.Abstain.Int64(),
			No:         item.FinalTallyResult.No.Int64(),
			NoWithVeto: item.FinalTallyResult.NoWithVeto.Int64(),
		},
		SubmitTime:      item.SubmitTime,
		DepositEndTime:  item.DepositEndTime,
		VotingStartTime: item.VotingStartTime,
		VotingEndTime:   item.VotingEndTime,
	}
}

type Proposals []Proposal

func NewProposalsFromRaw(items gov.Proposals) Proposals {
	proposals := make(Proposals, 0, len(items))
	for _, proposal := range items {
		proposals = append(proposals, NewProposalFromRaw(proposal))
	}

	return proposals
}

func NewDepositFromRaw(deposit gov.Deposit) other.Deposit {
	return other.Deposit{
		Address: common.HexBytes(deposit.Depositor.Bytes()).String(),
		Amount:  other.NewCoinsFromRaw(deposit.Amount),
	}
}

func NewDepositsFromRaw(items gov.Deposits) other.Deposits {
	deposits := make(other.Deposits, 0, len(items))
	for _, deposit := range items {
		deposits = append(deposits, NewDepositFromRaw(deposit))
	}

	return deposits
}
