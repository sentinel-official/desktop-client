package other

import (
	hub "github.com/sentinel-official/hub/types"
)

type Bandwidth struct {
	Upload   int64 `json:"upload"`
	Download int64 `json:"download"`
}

func NewBandwidthFromRaw(item hub.Bandwidth) Bandwidth {
	return Bandwidth{
		Upload:   item.Upload.Int64(),
		Download: item.Download.Int64(),
	}
}
