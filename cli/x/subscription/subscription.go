package subscription

import (
	"time"

	subscriptiontypes "github.com/sentinel-official/hub/x/subscription/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type Subscription struct {
	Id       uint64      `json:"id"`
	Owner    string      `json:"owner"`
	Plan     uint64      `json:"plan,omitempty"`
	Expiry   time.Time   `json:"expiry,omitempty"`
	Denom    string      `json:"denom"`
	Node     string      `json:"node,omitempty"`
	Price    common.Coin `json:"price,omitempty"`
	Deposit  common.Coin `json:"deposit,omitempty"`
	Free     int64       `json:"free"`
	Status   string      `json:"status"`
	StatusAt time.Time   `json:"status_at"`
}

func NewSubscriptionFromRaw(item *subscriptiontypes.Subscription) Subscription {
	return Subscription{
		Id:       item.Id,
		Owner:    item.Owner,
		Plan:     item.Plan,
		Expiry:   item.Expiry,
		Denom:    item.Denom,
		Node:     item.Node,
		Price:    common.NewCoinFromRaw(&item.Price),
		Deposit:  common.NewCoinFromRaw(&item.Deposit),
		Free:     item.Free.Int64(),
		Status:   item.Status.String(),
		StatusAt: item.StatusAt,
	}
}

type Subscriptions []Subscription

func NewSubscriptionsFromRaw(items subscriptiontypes.Subscriptions) Subscriptions {
	subscriptions := make(Subscriptions, 0, len(items))
	for _, item := range items {
		subscriptions = append(subscriptions, NewSubscriptionFromRaw(&item))
	}

	return subscriptions
}
