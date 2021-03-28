package plan

import (
	"time"

	"github.com/sentinel-official/hub/x/plan"
	"github.com/tendermint/tendermint/libs/bytes"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type Plan struct {
	ID       uint64      `json:"id"`
	Provider string      `json:"provider"`
	Price    other.Coins `json:"price"`
	Validity int64       `json:"validity"`
	Bytes    int64       `json:"bytes"`
	Status   string      `json:"status"`
	StatusAt time.Time   `json:"status_at"`
}

func NewPlanFromRaw(item plan.Plan) Plan {
	return Plan{
		ID:       item.ID,
		Provider: bytes.HexBytes(item.Provider.Bytes()).String(),
		Price:    other.NewCoinsFromRaw(item.Price),
		Validity: item.Validity.Nanoseconds(),
		Bytes:    item.Bytes.Int64(),
		Status:   item.Status.String(),
		StatusAt: item.StatusAt,
	}
}

type Plans []Plan

func NewPlansFromRaw(items plan.Plans) Plans {
	plans := make(Plans, 0, len(items))
	for _, item := range items {
		plans = append(plans, NewPlanFromRaw(item))
	}

	return plans
}
