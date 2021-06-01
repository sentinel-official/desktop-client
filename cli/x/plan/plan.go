package plan

import (
	"time"

	plantypes "github.com/sentinel-official/hub/x/plan/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type Plan struct {
	Id       uint64       `json:"id"`
	Provider string       `json:"provider"`
	Price    common.Coins `json:"price"`
	Validity int64        `json:"validity"`
	Bytes    int64        `json:"bytes"`
	Status   string       `json:"status"`
	StatusAt time.Time    `json:"status_at"`
}

func NewPlanFromRaw(item *plantypes.Plan) Plan {
	return Plan{
		Id:       item.Id,
		Provider: item.Provider,
		Price:    common.NewCoinsFromRaw(item.Price),
		Validity: item.Validity.Nanoseconds(),
		Bytes:    item.Bytes.Int64(),
		Status:   item.Status.String(),
		StatusAt: item.StatusAt,
	}
}

type Plans []Plan

func NewPlansFromRaw(items plantypes.Plans) Plans {
	plans := make(Plans, 0, len(items))
	for _, item := range items {
		plans = append(plans, NewPlanFromRaw(&item))
	}

	return plans
}
