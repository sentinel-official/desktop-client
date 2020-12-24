package types

type Error struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Module  string `json:"module,omitempty"`
}

func NewError(code int, message, module string) *Error {
	return &Error{
		Code:    code,
		Message: message,
		Module:  module,
	}
}
