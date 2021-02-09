import Async from 'async';
import {
    TX_WITHDRAW_ERROR,
    TX_WITHDRAW_FROM_SET,
    TX_WITHDRAW_IN_PROGRESS,
    TX_WITHDRAW_MEMO_SET,
    TX_WITHDRAW_MODAL_HIDE,
    TX_WITHDRAW_MODAL_SHOW,
    TX_WITHDRAW_SUCCESS,
    TX_WITHDRAW_URL,
} from '../../constants/transactions';
import Axios from '../../services/axios';

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

export const txWithdraw = (body, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txWithdrawInProgress());
            next(null);
        }, (next) => {
            Axios.post(TX_WITHDRAW_URL, body)
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
