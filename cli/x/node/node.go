package node

import (
	"time"

	"github.com/sentinel-official/hub/x/node"
	"github.com/tendermint/tendermint/libs/bytes"

	"github.com/sentinel-official/desktop-client/cli/x/other"
)

type Node struct {
	Address   string      `json:"address"`
	Provider  string      `json:"provide"`
	Price     other.Coins `json:"price"`
	RemoteURL string      `json:"remote_url"`
	Status    string      `json:"status"`
	StatusAt  time.Time   `json:"status_at"`
}

func NewNodeFromRaw(item node.Node) Node {
	return Node{
		Address:   bytes.HexBytes(item.Address.Bytes()).String(),
		Provider:  bytes.HexBytes(item.Address.Bytes()).String(),
		Price:     other.NewCoinsFromRaw(item.Price),
		RemoteURL: item.RemoteURL,
		Status:    item.Status.String(),
		StatusAt:  item.StatusAt,
	}
}

type Nodes []Node

func NewNodesFromRaw(items node.Nodes) Nodes {
	nodes := make(Nodes, 0, len(items))
	for _, item := range items {
		nodes = append(nodes, NewNodeFromRaw(item))
	}

	return nodes
}
