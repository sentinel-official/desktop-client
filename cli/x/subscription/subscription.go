package subscription

import (
	"time"

	"github.com/sentinel-official/hub/x/subscription"
	"github.com/tendermint/tendermint/libs/bytes"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type Subscription struct {
	ID       uint64     `json:"id"`
	Owner    string     `json:"owner"`
	Plan     uint64     `json:"plan,omitempty"`
	Expiry   time.Time  `json:"expiry,omitempty"`
	Node     string     `json:"node,omitempty"`
	Price    other.Coin `json:"price,omitempty"`
	Deposit  other.Coin `json:"deposit,omitempty"`
	Free     int64      `json:"free"`
	Status   string     `json:"status"`
	StatusAt time.Time  `json:"status_at"`
}

func NewSubscriptionFromRaw(item subscription.Subscription) Subscription {
	return Subscription{
		ID:       item.ID,
		Owner:    bytes.HexBytes(item.Owner.Bytes()).String(),
		Plan:     item.Plan,
		Expiry:   item.Expiry,
		Node:     bytes.HexBytes(item.Node.Bytes()).String(),
		Price:    other.NewCoinFromRaw(item.Price),
		Deposit:  other.NewCoinFromRaw(item.Deposit),
		Free:     item.Free.Int64(),
		Status:   item.Status.String(),
		StatusAt: item.StatusAt,
	}
}

type Subscriptions []Subscription

func NewSubscriptionsFromRaw(items subscription.Subscriptions) Subscriptions {
	subscriptions := make(Subscriptions, 0, len(items))
	for _, item := range items {
		subscriptions = append(subscriptions, NewSubscriptionFromRaw(item))
	}

	return subscriptions
}
