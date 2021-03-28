import { COIN_DECIMALS, COIN_DENOM, emptyFunc } from '../../constants/common';
import {
    TX_SEND_AMOUNT_SET,
    TX_SEND_ERROR,
    TX_SEND_IN_PROGRESS,
    TX_SEND_MEMO_SET,
    TX_SEND_MODAL_HIDE,
    TX_SEND_MODAL_SHOW,
    TX_SEND_SUCCESS,
    TX_SEND_TO_SET,
    txSendURL,
} from '../../constants/transactions';
import { decodeFromBech32 } from '../../utils/bech32';
import Async from 'async';
import Axios from '../../services/axios';

export const setTxSendTo = (data) => {
    return {
        type: TX_SEND_TO_SET,
        data,
    };
};

export const setTxSendAmount = (data) => {
    return {
        type: TX_SEND_AMOUNT_SET,
        data,
    };
};

export const setTxSendMemo = (data) => {
    return {
        type: TX_SEND_MEMO_SET,
        data,
    };
};

export const txSendInProgress = (data) => {
    return {
        type: TX_SEND_IN_PROGRESS,
        data,
    };
};

export const txSendSuccess = (data) => {
    return {
        type: TX_SEND_SUCCESS,
        data,
    };
};

export const txSendError = (data) => {
    return {
        type: TX_SEND_ERROR,
        data,
    };
};

export const txSend = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txSendInProgress());
            next(null);
        }, (next) => {
            const {
                transactions: {
                    send: {
                        to,
                        amount,
                        memo,
                    },
                },
                account: { password },
            } = getState();

            const url = txSendURL();
            Axios.post(url, {
                to: decodeFromBech32(to.value.trim()),
                amount: [{
                    denom: COIN_DENOM,
                    value: amount.value * Math.pow(10, COIN_DECIMALS),
                }],
                memo: memo.value.trim(),
                password: password.value.trim(),
            })
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.log(error);

                    dispatch(txSendError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txSendSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxSendModal = (data) => {
    return {
        type: TX_SEND_MODAL_SHOW,
        data,
    };
};

export const hideTxSendModal = (data) => {
    return {
        type: TX_SEND_MODAL_HIDE,
        data,
    };
};
