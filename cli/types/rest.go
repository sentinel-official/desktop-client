package types

import (
	"net/http"
)

type Response struct {
	Success bool `json:"success"`
	Error   struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error,omitempty"`
	Result interface{} `json:"result,omitempty"`
}

type ResponseWriter struct {
	http.ResponseWriter
	Status int
	Length int
}

func NewResponseWriter(w http.ResponseWriter) *ResponseWriter {
	return &ResponseWriter{
		ResponseWriter: w,
		Status:         0,
		Length:         0,
	}
}

func (r *ResponseWriter) Header() http.Header {
	return r.ResponseWriter.Header()
}

func (r *ResponseWriter) Write(p []byte) (n int, err error) {
	n, err = r.ResponseWriter.Write(p)
	r.Length += n

	return n, err
}

func (r *ResponseWriter) WriteHeader(status int) {
	r.ResponseWriter.WriteHeader(status)
	r.Status = status
}
