package lite

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth"
	"github.com/cosmos/cosmos-sdk/x/staking"
)

func (c *Client) QueryAccount(address sdk.AccAddress) (auth.Account, error) {
	bytes, err := c.ctx.Codec.MarshalJSON(auth.NewQueryAccountParams(address))
	if err != nil {
		return nil, err
	}

	path := fmt.Sprintf("custom/%s/%s", auth.QuerierRoute, auth.QueryAccount)
	res, _, err := c.ctx.QueryWithData(path, bytes)
	if err != nil {
		return nil, err
	}
	if res == nil {
		return nil, nil
	}

	var item auth.Account
	if err := c.ctx.Codec.UnmarshalJSON(res, &item); err != nil {
		return nil, err
	}

	return item, nil
}

func (c *Client) QueryValidator(address sdk.ValAddress) (staking.Validator, error) {
	bytes, err := c.ctx.Codec.MarshalJSON(staking.NewQueryValidatorParams(address))
	if err != nil {
		return staking.Validator{}, err
	}

	path := fmt.Sprintf("custom/%s/%s", staking.QuerierRoute, staking.QueryValidator)
	res, _, err := c.ctx.QueryWithData(path, bytes)
	if err != nil {
		return staking.Validator{}, err
	}
	if res == nil {
		return staking.Validator{}, nil
	}

	var item staking.Validator
	if err := c.ctx.Codec.UnmarshalJSON(res, &item); err != nil {
		return staking.Validator{}, err
	}

	return item, nil
}

func (c *Client) QueryValidators(page, limit int, status string) (staking.Validators, error) {
	bytes, err := c.ctx.Codec.MarshalJSON(staking.NewQueryValidatorsParams(page, limit, status))
	if err != nil {
		return nil, err
	}

	path := fmt.Sprintf("custom/%s/%s", staking.QuerierRoute, staking.QueryValidators)
	res, _, err := c.ctx.QueryWithData(path, bytes)
	if err != nil {
		return nil, err
	}
	if res == nil {
		return nil, nil
	}

	var items staking.Validators
	if err := c.ctx.Codec.UnmarshalJSON(res, &items); err != nil {
		return nil, err
	}

	return items, nil
}

func (c *Client) QueryDelegations(address sdk.AccAddress) (staking.Delegations, error) {
	bytes, err := c.ctx.Codec.MarshalJSON(staking.NewQueryDelegatorParams(address))
	if err != nil {
		return nil, err
	}

	path := fmt.Sprintf("custom/%s/%s", staking.QuerierRoute, staking.QueryDelegatorDelegations)
	res, _, err := c.ctx.QueryWithData(path, bytes)
	if err != nil {
		return nil, err
	}
	if res == nil {
		return nil, nil
	}

	var items staking.Delegations
	if err := c.ctx.Codec.UnmarshalJSON(res, &items); err != nil {
		return nil, err
	}

	return items, nil
}
