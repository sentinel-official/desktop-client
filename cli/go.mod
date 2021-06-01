module github.com/sentinel-official/desktop-client/cli

go 1.16

require (
	github.com/cosmos/cosmos-sdk v0.42.5
	github.com/cosmos/go-bip39 v1.0.0
	github.com/go-kit/kit v0.10.0
	github.com/gorilla/mux v1.8.0
	github.com/pelletier/go-toml v1.8.1
	github.com/rs/cors v1.7.0
	github.com/sentinel-official/hub v0.6.2
	github.com/spf13/cobra v1.1.3
	github.com/spf13/viper v1.7.1
	github.com/tendermint/tendermint v0.34.10
	golang.org/x/crypto v0.0.0-20201221181555-eec23a3978ad
	golang.org/x/net v0.0.0-20210316092652-d523dce5a7f4
	google.golang.org/grpc v1.38.0
)

replace (
	github.com/cosmos/cosmos-sdk => github.com/sentinel-official/cosmos-sdk v0.42.6-sentinel
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
