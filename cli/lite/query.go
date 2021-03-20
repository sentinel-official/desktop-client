package lite

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/auth/exported"
	"github.com/cosmos/cosmos-sdk/x/gov"
	"github.com/cosmos/cosmos-sdk/x/staking"
	hub "github.com/sentinel-official/hub/types"
	"github.com/sentinel-official/hub/x/deposit"
	"github.com/sentinel-official/hub/x/node"
	"github.com/sentinel-official/hub/x/plan"
	"github.com/sentinel-official/hub/x/provider"
	"github.com/sentinel-official/hub/x/session"
	"github.com/sentinel-official/hub/x/subscription"
	"github.com/sentinel-official/hub/x/vpn"
)

func (c *Client) Query(path string, params, result interface{}) error {
	bytes, err := c.ctx.Codec.MarshalJSON(params)
	if err != nil {
		return err
	}

	res, _, err := c.ctx.QueryWithData(path, bytes)
	if err != nil {
		return err
	}
	if res == nil {
		return nil
	}

	return c.ctx.Codec.UnmarshalJSON(res, result)
}

func (c *Client) QueryAccount(address sdk.AccAddress) (exported.Account, error) {
	var (
		result exported.Account
		path   = fmt.Sprintf("custom/%s/%s", auth.QuerierRoute, auth.QueryAccount)
	)

	if err := c.Query(path, auth.NewQueryAccountParams(address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryValidator(address sdk.ValAddress) (staking.Validator, error) {
	var (
		result staking.Validator
		path   = fmt.Sprintf("custom/%s/%s", staking.QuerierRoute, staking.QueryValidator)
	)

	if err := c.Query(path, staking.NewQueryValidatorParams(address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryValidators(page, limit int, status string) (staking.Validators, error) {
	var (
		result staking.Validators
		path   = fmt.Sprintf("custom/%s/%s", staking.QuerierRoute, staking.QueryValidators)
	)

	if err := c.Query(path, staking.NewQueryValidatorsParams(page, limit, status), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryDelegations(address sdk.AccAddress) (staking.Delegations, error) {
	var (
		result staking.Delegations
		path   = fmt.Sprintf("custom/%s/%s", staking.QuerierRoute, staking.QueryDelegatorDelegations)
	)

	if err := c.Query(path, staking.NewQueryDelegatorParams(address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryProposals() (gov.Proposals, error) {
	var (
		result gov.Proposals
		path   = fmt.Sprintf("custom/%s/%s", gov.QuerierRoute, gov.QueryProposals)
	)

	if err := c.Query(path, gov.NewQueryProposalsParams(0, 0, gov.StatusNil, nil, nil), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryProposalVote(id uint64, address sdk.AccAddress) (gov.Vote, error) {
	var (
		result gov.Vote
		path   = fmt.Sprintf("custom/%s/%s", gov.QuerierRoute, gov.QueryVote)
	)

	if err := c.Query(path, gov.NewQueryVoteParams(id, address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryDeposit(address sdk.AccAddress) (deposit.Deposit, error) {
	var (
		result deposit.Deposit
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, deposit.QuerierRoute, deposit.QueryDeposit)
	)

	if err := c.Query(path, deposit.NewQueryDepositParams(address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryProvider(address hub.ProvAddress) (provider.Provider, error) {
	var (
		result provider.Provider
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, provider.QuerierRoute, provider.QueryProvider)
	)

	if err := c.Query(path, provider.NewQueryProviderParams(address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryProviders(skip, limit int) (provider.Providers, error) {
	var (
		result provider.Providers
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, provider.QuerierRoute, provider.QueryProviders)
	)

	if err := c.Query(path, provider.NewQueryProvidersParams(skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryNode(address hub.NodeAddress) (node.Node, error) {
	var (
		result node.Node
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, node.QuerierRoute, node.QueryNode)
	)

	if err := c.Query(path, node.NewQueryNodeParams(address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryNodes(status hub.Status, skip, limit int) (node.Nodes, error) {
	var (
		result node.Nodes
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, node.QuerierRoute, node.QueryNodes)
	)

	if err := c.Query(path, node.NewQueryNodesParams(status, skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryNodesForPlan(id uint64, skip, limit int) (node.Nodes, error) {
	var (
		result node.Nodes
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, plan.QuerierRoute, plan.QueryNodesForPlan)
	)

	if err := c.Query(path, plan.NewQueryNodesForPlanParams(id, skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryPlan(id uint64) (plan.Plan, error) {
	var (
		result plan.Plan
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, plan.QuerierRoute, plan.QueryPlan)
	)

	if err := c.Query(path, plan.NewQueryPlanParams(id), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryPlansForProvider(address hub.ProvAddress, status hub.Status, skip, limit int) (plan.Plans, error) {
	var (
		result plan.Plans
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, plan.QuerierRoute, plan.QueryPlansForProvider)
	)

	if err := c.Query(path, plan.NewQueryPlansForProviderParams(address, status, skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QuerySubscription(id uint64) (subscription.Subscription, error) {
	var (
		result subscription.Subscription
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, subscription.QuerierRoute, subscription.QuerySubscription)
	)

	if err := c.Query(path, subscription.NewQuerySubscriptionParams(id), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QuerySubscriptionsForAddress(address sdk.AccAddress, status hub.Status, skip, limit int) (subscription.Subscriptions, error) {
	var (
		result subscription.Subscriptions
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, subscription.QuerierRoute, subscription.QuerySubscriptionsForAddress)
	)

	if err := c.Query(path, subscription.NewQuerySubscriptionsForAddressParams(address, status, skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryQuota(id uint64, address sdk.AccAddress) (subscription.Quota, error) {
	var (
		result subscription.Quota
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, subscription.QuerierRoute, subscription.QueryQuota)
	)

	if err := c.Query(path, subscription.NewQueryQuotaParams(id, address), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QueryQuotas(id uint64, skip, limit int) (subscription.Quotas, error) {
	var (
		result subscription.Quotas
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, subscription.QuerierRoute, subscription.QueryQuotas)
	)

	if err := c.Query(path, subscription.NewQueryQuotasParams(id, skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QuerySession(id uint64) (session.Session, error) {
	var (
		result session.Session
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, session.QuerierRoute, session.QuerySession)
	)

	if err := c.Query(path, session.NewQuerySessionParams(id), &result); err != nil {
		return result, err
	}

	return result, nil
}

func (c *Client) QuerySessionsForAddress(address sdk.AccAddress, status hub.Status, skip, limit int) (session.Sessions, error) {
	var (
		result session.Sessions
		path   = fmt.Sprintf("custom/%s/%s/%s", vpn.QuerierRoute, session.QuerierRoute, session.QuerySessionsForAddress)
	)

	if err := c.Query(path, session.NewQuerySessionsForAddressParams(address, status, skip, limit), &result); err != nil {
		return result, err
	}

	return result, nil
}
