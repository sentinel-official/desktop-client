package models

import (
	"github.com/cosmos/cosmos-sdk/crypto/keys"
	"github.com/tendermint/tendermint/libs/common"
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
		PubKey:   common.HexBytes(info.GetPubKey().Bytes()).String(),
		Address:  common.HexBytes(info.GetAddress().Bytes()).String(),
		Mnemonic: mnemonic,
	}
}

type Keys []Key

func NewKeysFromRaw(infos []keys.Info, mnemonics []string) Keys {
	_keys := make(Keys, 0, len(infos))
	for i := 0; i < len(infos); i++ {
		_keys = append(_keys, NewKeyFromRaw(infos[i], mnemonics[i]))
	}

	return _keys
}
