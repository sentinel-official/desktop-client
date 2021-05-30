package lite

import (
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (c *Client) BroadcastTx(memo string, messages ...sdk.Msg) (res *sdk.TxResponse, err error) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	account, err := c.AccountRetriever().GetAccount(c.ctx, c.FromAddress())
	if err != nil {
		return nil, err
	}

	var (
		name = c.From()
		txf  = c.txf.
			WithAccountNumber(account.GetAccountNumber()).
			WithMemo(memo).
			WithSequence(account.GetSequence())
	)

	if c.SimulateAndExecute() {
		_, adjusted, err := tx.CalculateGas(c.ctx.QueryWithData, txf, messages...)
		if err != nil {
			return nil, err
		}

		txf = txf.WithGas(adjusted)
	}

	txb, err := tx.BuildUnsignedTx(txf, messages...)
	if err != nil {
		return nil, err
	}

	if err := tx.Sign(txf, name, txb, true); err != nil {
		return nil, err
	}

	txBytes, err := c.TxConfig().TxEncoder()(txb.GetTx())
	if err != nil {
		return nil, err
	}

	return c.ctx.BroadcastTx(txBytes)
}
