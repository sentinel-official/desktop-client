package gov

import (
	"time"

	xgov "github.com/cosmos/cosmos-sdk/x/gov"

	"github.com/sentinel-official/desktop-client/cli/x/gov"
	"github.com/sentinel-official/desktop-client/cli/x/other"
)

var DummyProposals = gov.Proposals{
	gov.Proposal{
		Index:       1,
		Type:        "cosmos-sdk/TextProposal",
		Title:       "Stargate Upgrade Proposal 1",
		Description: `Stargate is our name for the process of ensuring that the widely integrated public network known as the Cosmos Hub is able to execute the cosmoshub-3 -\u003e cosmoshub-4 upgrade with the minimum disruption to its existing ecosystem. This upgrade will also realize the Internet of Blockchains vision from the Cosmos whitepaper.\nIntegrations from ecosystem partners are at risk of breaking changes due to the Stargate changes. These changes drive the need for substantial resource and time requirements to ensure successful migration. Stargate represents a unique set of circumstances and is not intended to set precedent for future upgrades which are expected to be less dramatic.\nThere is a widespread consensus from many Cosmos stakeholders that these changes to core software components will enhance the performance and composability of the software and the value of the Cosmos Hub in a world of many blockchains.\nA Yes result on this proposal provides a clear signal that the Cosmos Hub accepts and understands the Stargate process and is prepared to approve an upgrade with proposed changes if the plan below is executed successfully.\nA No result would force a reconsideration of the tradeoffs in the Alternatives section and the forming a new plan to deliver IBC.\nSee the full proposal here: https://ipfs.io/ipfs/Qmbo3fF54tX3JdoHZNVLcSBrdkXLie56Vh2u29wLfs4PnW"`,
		Status:      xgov.StatusPassed.String(),
		Deposit: other.Coins{
			{
				Denom: "uatom",
				Value: 512000000,
			},
		},
		TallyResult: gov.TallyResult{
			Yes:        101845973043268,
			Abstain:    559408864,
			No:         21185026706,
			NoWithVeto: 106144492,
		},
		SubmitTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-07-12T06:23:02.440964897Z")
			return t
		}(),
		DepositEndTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-07-26T06:23:02.440964897Z")
			return t
		}(),
		VotingStartTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-07-13T01:37:47.298505506Z")
			return t
		}(),
		VotingEndTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-07-27T01:37:47.298505506Z")
			return t
		}(),
	},
	gov.Proposal{
		Index:       2,
		Type:        "cosmos-sdk/TextProposal",
		Title:       "Genesis fund recovery proposal on behalf of fundraiser participants unable to access their ATOMs",
		Description: `The purpose of this proposal is to restore access to geneis ATOMs for a subset of donors who have been active participants in our community through the last year.\n The view of iqlusion is that this is an important moment for the Cosmos Hub. Stargate brings the fundraiser period to the end with delivery of IBC. This proposal resolves the open business of active members of our community who cannot access their ATOM. This is an opportunity is opporunity to bring this business to a close and setup the agenda for IBC powered innovation coming in 2021.We strongly encourage the Cosmos Community to verify the cryptographic evidence and bring these community members to full ATOM holder status.\n\n\nFull Proposal:https://ipfs.io/ipfs/QmV6pBgDppN7X3BdVW197EUe7dpcmcdLMivPa6xxtPj3aW \nThe original authors of the proposal will be available to answer questions on the Cosmos forum.\nhttps://forum.cosmos.network/t/updated-genesis-atoms-recovery-request-proposal/3905`,
		Status:      xgov.StatusPassed.String(),
		Deposit: other.Coins{
			{
				Denom: "uatom",
				Value: 512000000,
			},
		},
		TallyResult: gov.TallyResult{
			Yes:        60252124759321,
			Abstain:    19764603711398,
			No:         6614606743206,
			NoWithVeto: 998582410890,
		},
		SubmitTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-09-09T06:47:46.521375251Z")
			return t
		}(),
		DepositEndTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-09-23T06:47:46.521375251Z")
			return t
		}(),
		VotingStartTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-09-09T06:47:46.521375251Z")
			return t
		}(),
		VotingEndTime: func() time.Time {
			t, _ := time.Parse(time.RFC3339Nano, "2020-09-23T06:47:46.521375251Z")
			return t
		}(),
	},
}
