package session

import (
	"time"

	"github.com/sentinel-official/hub/x/session"
	"github.com/tendermint/tendermint/libs/bytes"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type Session struct {
	ID           uint64          `json:"id"`
	Subscription uint64          `json:"subscription"`
	Node         string          `json:"node"`
	Address      string          `json:"address"`
	Duration     int64           `json:"duration"`
	Bandwidth    other.Bandwidth `json:"bandwidth"`
	Status       string          `json:"status"`
	StatusAt     time.Time       `json:"status_at"`
}

func NewSessionFromRaw(item session.Session) Session {
	return Session{
		ID:           item.ID,
		Subscription: item.Subscription,
		Node:         bytes.HexBytes(item.Node.Bytes()).String(),
		Address:      bytes.HexBytes(item.Address.Bytes()).String(),
		Duration:     item.Duration.Nanoseconds(),
		Bandwidth:    other.NewBandwidthFromRaw(item.Bandwidth),
		Status:       item.Status.String(),
		StatusAt:     item.StatusAt,
	}
}

type Sessions []Session

func NewSessionsFromRaw(items session.Sessions) Sessions {
	sessions := make(Sessions, 0, len(items))
	for _, item := range items {
		sessions = append(sessions, NewSessionFromRaw(item))
	}

	return sessions
}
