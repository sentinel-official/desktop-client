import Async from 'async';
import { COIN_DENOM, emptyFunc } from '../../constants/common';
import {
    TX_UNBOND_AMOUNT_SET,
    TX_UNBOND_ERROR,
    TX_UNBOND_FROM_SET,
    TX_UNBOND_IN_PROGRESS,
    TX_UNBOND_MEMO_SET,
    TX_UNBOND_MODAL_HIDE,
    TX_UNBOND_MODAL_SHOW,
    TX_UNBOND_SUCCESS,
    getTxUnbondURL,
} from '../../constants/transactions';
import Axios from '../../services/axios';

export const setTxUnbondFrom = (data) => {
    return {
        type: TX_UNBOND_FROM_SET,
        data,
    };
};

export const setTxUnbondAmount = (data) => {
    return {
        type: TX_UNBOND_AMOUNT_SET,
        data,
    };
};

export const setTxUnbondMemo = (data) => {
    return {
        type: TX_UNBOND_MEMO_SET,
        data,
    };
};

export const txUnbondInProgress = (data) => {
    return {
        type: TX_UNBOND_IN_PROGRESS,
        data,
    };
};

export const txUnbondSuccess = (data) => {
    return {
        type: TX_UNBOND_SUCCESS,
        data,
    };
};

export const txUnbondError = (data) => {
    return {
        type: TX_UNBOND_ERROR,
        data,
    };
};

export const txUnbond = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txUnbondInProgress());
            next(null);
        }, (next) => {
            let {
                account: { password },
                keys: {
                    items,
                    index,
                },
                transactions: {
                    unbond: {
                        from,
                        amount,
                        memo,
                    },
                },
            } = getState();

            from = from.value.trim();
            amount = {
                denom: COIN_DENOM,
                value: amount.value * Math.pow(10, 6),
            };
            memo = memo.value.trim();
            password = password.value.trim();

            const url = getTxUnbondURL(items[index].address);
            Axios.post(url, {
                from,
                amount,
                memo,
                password,
            })
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    dispatch(txUnbondError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txUnbondSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxUnbondModal = (data) => {
    return {
        type: TX_UNBOND_MODAL_SHOW,
        data,
    };
};

export const hideTxUnbondModal = (data) => {
    return {
        type: TX_UNBOND_MODAL_HIDE,
        data,
    };
};
