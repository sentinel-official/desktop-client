package node

import (
	"time"

	nodetypes "github.com/sentinel-official/hub/x/node/types"

	"github.com/sentinel-official/desktop-client/cli/x/common"
)

type Node struct {
	Address   string       `json:"address"`
	Provider  string       `json:"provider"`
	Price     common.Coins `json:"price"`
	RemoteURL string       `json:"remote_url"`
	Status    string       `json:"status"`
	StatusAt  time.Time    `json:"status_at"`
}

func NewNodeFromRaw(item *nodetypes.Node) Node {
	return Node{
		Address:   item.Address,
		Provider:  item.Provider,
		Price:     common.NewCoinsFromRaw(item.Price),
		RemoteURL: item.RemoteURL,
		Status:    item.Status.String(),
		StatusAt:  item.StatusAt,
	}
}

type Nodes []Node

func NewNodesFromRaw(items nodetypes.Nodes) Nodes {
	nodes := make(Nodes, 0, len(items))
	for i := range items {
		nodes = append(nodes, NewNodeFromRaw(&items[i]))
	}

	return nodes
}
