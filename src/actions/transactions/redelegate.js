import Async from 'async';
import Axios from 'axios';
import {
    TX_REDELEGATE_AMOUNT_SET,
    TX_REDELEGATE_ERROR,
    TX_REDELEGATE_FROM_SET,
    TX_REDELEGATE_IN_PROGRESS,
    TX_REDELEGATE_MEMO_SET,
    TX_REDELEGATE_MODAL_HIDE,
    TX_REDELEGATE_MODAL_SHOW,
    TX_REDELEGATE_SUCCESS,
    TX_REDELEGATE_TO_SET,
    TX_REDELEGATE_URL,
} from '../../constants/transactions';

export const setTxRedelegateFrom = (data) => {
    return {
        type: TX_REDELEGATE_FROM_SET,
        data,
    };
};

export const setTxRedelegateTo = (data) => {
    return {
        type: TX_REDELEGATE_TO_SET,
        data,
    };
};

export const setTxRedelegateAmount = (data) => {
    return {
        type: TX_REDELEGATE_AMOUNT_SET,
        data,
    };
};

export const setTxRedelegateMemo = (data) => {
    return {
        type: TX_REDELEGATE_MEMO_SET,
        data,
    };
};

export const txRedelegateInProgress = (data) => {
    return {
        type: TX_REDELEGATE_IN_PROGRESS,
        data,
    };
};

export const txRedelegateSuccess = (data) => {
    return {
        type: TX_REDELEGATE_SUCCESS,
        data,
    };
};

export const txRedelegateError = (data) => {
    return {
        type: TX_REDELEGATE_ERROR,
        data,
    };
};

export const txRedelegate = (body, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txRedelegateInProgress());
            next(null);
        }, (next) => {
            Axios.post(TX_REDELEGATE_URL, body)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    dispatch(txRedelegateError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txRedelegateSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxRedelegateModal = (data) => {
    return {
        type: TX_REDELEGATE_MODAL_SHOW,
        data,
    };
};

export const hideTxRedelegateModal = (data) => {
    return {
        type: TX_REDELEGATE_MODAL_HIDE,
        data,
    };
};
