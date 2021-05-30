package session

import (
	"time"

	sessiontypes "github.com/sentinel-official/hub/x/session/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type Session struct {
	Id           uint64           `json:"id"`
	Subscription uint64           `json:"subscription"`
	Node         string           `json:"node"`
	Address      string           `json:"address"`
	Duration     int64            `json:"duration"`
	Bandwidth    common.Bandwidth `json:"bandwidth"`
	Status       string           `json:"status"`
	StatusAt     time.Time        `json:"status_at"`
}

func NewSessionFromRaw(item *sessiontypes.Session) Session {
	return Session{
		Id:           item.Id,
		Subscription: item.Subscription,
		Node:         item.Node,
		Address:      item.Address,
		Duration:     item.Duration.Nanoseconds(),
		Bandwidth:    common.NewBandwidthFromRaw(item.Bandwidth),
		Status:       item.Status.String(),
		StatusAt:     item.StatusAt,
	}
}

type Sessions []Session

func NewSessionsFromRaw(items sessiontypes.Sessions) Sessions {
	sessions := make(Sessions, 0, len(items))
	for _, item := range items {
		sessions = append(sessions, NewSessionFromRaw(&item))
	}

	return sessions
}
