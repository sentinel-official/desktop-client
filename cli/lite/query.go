package lite

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	hubtypes "github.com/sentinel-official/hub/types"
	deposittypes "github.com/sentinel-official/hub/x/deposit/types"
	nodetypes "github.com/sentinel-official/hub/x/node/types"
	plantypes "github.com/sentinel-official/hub/x/plan/types"
	providertypes "github.com/sentinel-official/hub/x/provider/types"
	sessiontypes "github.com/sentinel-official/hub/x/session/types"
	subscriptiontypes "github.com/sentinel-official/hub/x/subscription/types"

	"github.com/sentinel-official/desktop-client/cli/utils"
)

func (c *Client) QueryAccount(address sdk.AccAddress) (authtypes.AccountI, error) {
	var (
		account authtypes.AccountI
		qc      = authtypes.NewQueryClient(c.ctx)
	)

	res, err := qc.Account(context.Background(),
		&authtypes.QueryAccountRequest{
			Address: address.String(),
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	if err := c.ctx.InterfaceRegistry.UnpackAny(res.Account, &account); err != nil {
		return nil, err
	}

	return account, nil
}

func (c *Client) QueryBalance(address sdk.AccAddress, denom string) (*sdk.Coin, error) {
	var (
		qc = banktypes.NewQueryClient(c.ctx)
	)

	res, err := qc.Balance(context.Background(),
		&banktypes.QueryBalanceRequest{
			Address: address.String(),
			Denom:   denom,
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Balance, nil
}

func (c *Client) QueryValidator(address sdk.ValAddress) (*stakingtypes.Validator, error) {
	var (
		qc = stakingtypes.NewQueryClient(c.ctx)
	)

	res, err := qc.Validator(context.Background(),
		&stakingtypes.QueryValidatorRequest{
			ValidatorAddr: address.String(),
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Validator, nil
}

func (c *Client) QueryValidators(status string, pagination *query.PageRequest) (stakingtypes.Validators, error) {
	var (
		qc = stakingtypes.NewQueryClient(c.ctx)
	)

	res, err := qc.Validators(context.Background(),
		&stakingtypes.QueryValidatorsRequest{
			Status:     status,
			Pagination: pagination,
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Validators, nil
}

func (c *Client) QueryDelegations(address sdk.AccAddress) (stakingtypes.DelegationResponses, error) {
	var (
		qc = stakingtypes.NewQueryClient(c.ctx)
	)

	res, err := qc.DelegatorDelegations(context.Background(),
		&stakingtypes.QueryDelegatorDelegationsRequest{
			DelegatorAddr: address.String(),
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.DelegationResponses, nil
}

func (c *Client) QueryProposals() (govtypes.Proposals, error) {
	var (
		qc = govtypes.NewQueryClient(c.ctx)
	)

	res, err := qc.Proposals(context.Background(),
		&govtypes.QueryProposalsRequest{
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Proposals, nil
}

func (c *Client) QueryProposalVote(id uint64, address sdk.AccAddress) (*govtypes.Vote, error) {
	var (
		qc = govtypes.NewQueryClient(c.ctx)
	)

	res, err := qc.Vote(context.Background(),
		&govtypes.QueryVoteRequest{
			ProposalId: id,
			Voter:      address.String(),
		},
	)
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Vote, nil
}

func (c *Client) QueryDeposit(address sdk.AccAddress) (*deposittypes.Deposit, error) {
	var (
		qc = deposittypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryDeposit(context.Background(),
		deposittypes.NewQueryDepositRequest(address))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Deposit, nil
}

func (c *Client) QueryProvider(address hubtypes.ProvAddress) (*providertypes.Provider, error) {
	var (
		qc = providertypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryProvider(context.Background(),
		providertypes.NewQueryProviderRequest(address))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Provider, nil
}

func (c *Client) QueryProviders(pagination *query.PageRequest) (providertypes.Providers, error) {
	var (
		qc = providertypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryProviders(context.Background(),
		providertypes.NewQueryProvidersRequest(pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Providers, nil
}

func (c *Client) QueryNode(address hubtypes.NodeAddress) (*nodetypes.Node, error) {
	var (
		qc = nodetypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryNode(context.Background(),
		nodetypes.NewQueryNodeRequest(address))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Node, nil
}

func (c *Client) QueryNodes(status hubtypes.Status, pagination *query.PageRequest) (nodetypes.Nodes, error) {
	var (
		qc = nodetypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryNodes(context.Background(),
		nodetypes.NewQueryNodesRequest(status, pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Nodes, nil
}

func (c *Client) QueryNodesForPlan(id uint64, pagination *query.PageRequest) (nodetypes.Nodes, error) {
	var (
		qc = plantypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryNodesForPlan(context.Background(),
		plantypes.NewQueryNodesForPlanRequest(id, pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Nodes, nil
}

func (c *Client) QueryPlan(id uint64) (*plantypes.Plan, error) {
	var (
		qc = plantypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryPlan(context.Background(),
		plantypes.NewQueryPlanRequest(id))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Plan, nil
}

func (c *Client) QueryPlansForProvider(address hubtypes.ProvAddress, status hubtypes.Status, pagination *query.PageRequest) (plantypes.Plans, error) {
	var (
		qc = plantypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryPlansForProvider(context.Background(),
		plantypes.NewQueryPlansForProviderRequest(address, status, pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Plans, nil
}

func (c *Client) QuerySubscription(id uint64) (*subscriptiontypes.Subscription, error) {
	var (
		qc = subscriptiontypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QuerySubscription(context.Background(),
		subscriptiontypes.NewQuerySubscriptionRequest(id))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Subscription, nil
}

func (c *Client) QuerySubscriptionsForAddress(address sdk.AccAddress, status hubtypes.Status, pagination *query.PageRequest) (subscriptiontypes.Subscriptions, error) {
	var (
		qc = subscriptiontypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QuerySubscriptionsForAddress(context.Background(),
		subscriptiontypes.NewQuerySubscriptionsForAddressRequest(address, status, pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Subscriptions, nil
}

func (c *Client) QueryQuota(id uint64, address sdk.AccAddress) (*subscriptiontypes.Quota, error) {
	var (
		qc = subscriptiontypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryQuota(context.Background(),
		subscriptiontypes.NewQueryQuotaRequest(id, address))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Quota, nil
}

func (c *Client) QueryQuotas(id uint64, pagination *query.PageRequest) (subscriptiontypes.Quotas, error) {
	var (
		qc = subscriptiontypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QueryQuotas(context.Background(),
		subscriptiontypes.NewQueryQuotasRequest(id, pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Quotas, nil
}

func (c *Client) QuerySession(id uint64) (*sessiontypes.Session, error) {
	var (
		qc = sessiontypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QuerySession(context.Background(),
		sessiontypes.NewQuerySessionRequest(id))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return &res.Session, nil
}

func (c *Client) QuerySessionsForAddress(address sdk.AccAddress, status hubtypes.Status, pagination *query.PageRequest) (sessiontypes.Sessions, error) {
	var (
		qc = sessiontypes.NewQueryServiceClient(c.ctx)
	)

	res, err := qc.QuerySessionsForAddress(context.Background(),
		sessiontypes.NewQuerySessionsForAddressRequest(address, status, pagination))
	if err != nil {
		return nil, utils.IsNotFoundError(err)
	}

	return res.Sessions, nil
}
