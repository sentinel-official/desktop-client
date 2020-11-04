package types

type Error struct {
	Code    int64  `json:"code,omitempty"`
	Message string `json:"message,omitempty"`
	Module  string `json:"module,omitempty"`
}

func NewError(code int64, message, module string) *Error {
	return &Error{
		Code:    code,
		Message: message,
		Module:  module,
	}
}
