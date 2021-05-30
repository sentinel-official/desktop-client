import { COIN_DECIMALS, COIN_DENOM, emptyFunc } from '../../constants/common';
import {
    TX_UNBOND_AMOUNT_SET,
    TX_UNBOND_ERROR,
    TX_UNBOND_FROM_SET,
    TX_UNBOND_IN_PROGRESS,
    TX_UNBOND_MEMO_SET,
    TX_UNBOND_MODAL_HIDE,
    TX_UNBOND_MODAL_SHOW,
    TX_UNBOND_SUCCESS,
    txUnbondURL,
} from '../../constants/transactions';
import Async from 'async';
import Axios from 'axios';
import Lodash from 'lodash';

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
            const {
                keys: {
                    items,
                    name,
                },
                transactions: {
                    unbond: {
                        from,
                        amount,
                        memo,
                    },
                },
            } = getState();

            const item = Lodash.find(items, ['name', name]);
            const url = txUnbondURL(item.address);
            Axios.post(url, {
                from: from.value.trim(),
                amount: {
                    denom: COIN_DENOM,
                    value: amount.value * Math.pow(10, COIN_DECIMALS),
                },
                memo: memo.value.trim(),
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
