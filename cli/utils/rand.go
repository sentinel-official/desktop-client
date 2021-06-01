package utils

import (
	"crypto/rand"
	"encoding/hex"
)

func RandomStringHex(length int64) string {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		panic(err)
	}

	return hex.EncodeToString(bytes)
}
