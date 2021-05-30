package context

import (
	"context"

	"github.com/sentinel-official/desktop-client/cli/lite"
	"github.com/sentinel-official/desktop-client/cli/types"
)

type Context struct {
	home    string
	ctx     context.Context
	service types.Service
	client  *lite.Client
	config  *types.Config
}

func NewContext() *Context {
	return &Context{
		ctx: context.Background(),
	}
}

func (c *Context) WithHome(v string) *Context             { c.home = v; return c }
func (c *Context) WithClient(v *lite.Client) *Context     { c.client = v; return c }
func (c *Context) WithConfig(v *types.Config) *Context    { c.config = v; return c }
func (c *Context) WithContext(v context.Context) *Context { c.ctx = v; return c }
func (c *Context) WithService(v types.Service) *Context   { c.service = v; return c }

func (c *Context) Home() string             { return c.home }
func (c *Context) Client() *lite.Client     { return c.client }
func (c *Context) Config() *types.Config    { return c.config }
func (c *Context) Context() context.Context { return c.ctx }
func (c *Context) Service() types.Service   { return c.service }

func (c *Context) WithValue(key, value interface{}) *Context {
	c.WithContext(context.WithValue(c.ctx, key, value))
	return c
}

func (c *Context) Value(key interface{}) interface{} { return c.ctx.Value(key) }
