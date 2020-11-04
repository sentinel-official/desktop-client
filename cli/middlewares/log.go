package middlewares

import (
	"log"
	"net/http"
	"time"

	"github.com/sentinel-official/desktop-client/cli/types"
)

func Log(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rw := types.NewResponseWriter(w)
		start := time.Now()

		next.ServeHTTP(rw, r)

		log.Printf("- %s - %s %s %s - %d %d - %s - %s - %s", r.RemoteAddr, r.Proto, r.Method, r.RequestURI,
			rw.Status, rw.Length, time.Since(start), r.Referer(), r.UserAgent())
	})
}
