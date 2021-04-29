import {
    TX_WITHDRAW_ERROR,
    TX_WITHDRAW_FROM_SET,
    TX_WITHDRAW_IN_PROGRESS,
    TX_WITHDRAW_MEMO_SET,
    TX_WITHDRAW_MODAL_HIDE,
    TX_WITHDRAW_MODAL_SHOW,
    TX_WITHDRAW_SUCCESS,
    txWithdrawURL,
} from '../../constants/transactions';
import { emptyFunc } from '../../constants/common';
import Async from 'async';
import Axios from '../../services/axios';
import Lodash from 'lodash';

export const setTxWithdrawFrom = (data) => {
    return {
        type: TX_WITHDRAW_FROM_SET,
        data,
    };
};

export const setTxWithdrawMemo = (data) => {
    return {
        type: TX_WITHDRAW_MEMO_SET,
        data,
    };
};

export const txWithdrawInProgress = (data) => {
    return {
        type: TX_WITHDRAW_IN_PROGRESS,
        data,
    };
};

export const txWithdrawSuccess = (data) => {
    return {
        type: TX_WITHDRAW_SUCCESS,
        data,
    };
};

export const txWithdrawError = (data) => {
    return {
        type: TX_WITHDRAW_ERROR,
        data,
    };
};

export const txWithdraw = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txWithdrawInProgress());
            next(null);
        }, (next) => {
            const {
                account: { password },
                keys: {
                    items,
                    name,
                },
                transactions: {
                    withdraw: {
                        from,
                        memo,
                    },
                },
                delegations: { items: delegations },
            } = getState();

            const validators = from.value === 'All' ? delegations.map((item) => item['validator_address']) : [from.value.trim()];
            const item = Lodash.find(items, ['name', name]);
            const url = txWithdrawURL(item.address);
            Axios.post(url, {
                validators,
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
                    dispatch(txWithdrawError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txWithdrawSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxWithdrawModal = (data) => {
    return {
        type: TX_WITHDRAW_MODAL_SHOW,
        data,
    };
};

export const hideTxWithdrawModal = (data) => {
    return {
        type: TX_WITHDRAW_MODAL_HIDE,
        data,
    };
};
