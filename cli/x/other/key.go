package other

import (
	"github.com/cosmos/cosmos-sdk/crypto/keys"
	"github.com/tendermint/tendermint/libs/bytes"
)

type Key struct {
	Name     string `json:"name"`
	Type     string `json:"type"`
	PubKey   string `json:"pub_key"`
	Address  string `json:"address"`
	Mnemonic string `json:"mnemonic"`
}

func NewKeyFromRaw(info keys.Info, mnemonic string) Key {
	return Key{
		Name:     info.GetName(),
		Type:     info.GetType().String(),
		PubKey:   bytes.HexBytes(info.GetPubKey().Bytes()).String(),
		Address:  bytes.HexBytes(info.GetAddress().Bytes()).String(),
		Mnemonic: mnemonic,
	}
}

type Keys []Key

func NewKeysFromRaw(infos []keys.Info, mnemonics []string) Keys {
	items := make(Keys, 0, len(infos))
	for i := 0; i < len(infos); i++ {
		items = append(items, NewKeyFromRaw(infos[i], mnemonics[i]))
	}

	return items
}
