package utils

import (
	"encoding/hex"
	"encoding/json"
	"net/http"
	"net/url"
	"strconv"

	"github.com/cosmos/cosmos-sdk/types/query"

	"github.com/sentinel-official/desktop-client/cli/types"
)

func write(w http.ResponseWriter, status int, res types.Response) error {
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(res)
}

func WriteErrorToResponse(w http.ResponseWriter, status, code int, message string) {
	_ = write(w, status, types.Response{
		Success: false,
		Error:   types.NewError("", code, message),
	})
}

func WriteResultToResponse(w http.ResponseWriter, status int, result interface{}) {
	_ = write(w, status, types.Response{
		Success: true,
		Result:  result,
	})
}

func ParsePaginationQuery(values url.Values) (pagination *query.PageRequest, err error) {
	pagination = &query.PageRequest{
		Limit: 25,
	}

	if values.Get("key") != "" {
		pagination.Key, err = hex.DecodeString(values.Get("key"))
		if err != nil {
			return nil, err
		}
	}

	if values.Get("offset") != "" {
		pagination.Offset, err = strconv.ParseUint(values.Get("offset"), 0, 64)
		if err != nil {
			return nil, err
		}
	}

	if values.Get("limit") != "" {
		pagination.Limit, err = strconv.ParseUint(values.Get("limit"), 0, 64)
		if err != nil {
			return nil, err
		}
	}

	if values.Get("count_total") != "" {
		pagination.CountTotal = true
	}

	return pagination, nil
}
