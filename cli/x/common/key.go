package common

import (
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/tendermint/tendermint/libs/bytes"
)

type Key struct {
	Name     string `json:"name"`
	PubKey   string `json:"pub_key"`
	Address  string `json:"address"`
	Mnemonic string `json:"mnemonic,omitempty"`
}

func NewKeyFromRaw(info keyring.Info, mnemonic string) Key {
	return Key{
		Name:     info.GetName(),
		PubKey:   bytes.HexBytes(info.GetPubKey().Bytes()).String(),
		Address:  info.GetAddress().String(),
		Mnemonic: mnemonic,
	}
}

type Keys []Key

func NewKeysFromRaw(infos []keyring.Info, mnemonics []string) Keys {
	if mnemonics == nil {
		mnemonics = make([]string, len(infos))
	}

	items := make(Keys, 0, len(infos))
	for i := 0; i < len(infos); i++ {
		items = append(items, NewKeyFromRaw(infos[i], mnemonics[i]))
	}

	return items
}
