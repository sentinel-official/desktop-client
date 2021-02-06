import Async from 'async';
import Axios from 'axios';
import {
    TX_UNBOND_AMOUNT_SET,
    TX_UNBOND_ERROR,
    TX_UNBOND_FROM_SET,
    TX_UNBOND_IN_PROGRESS,
    TX_UNBOND_MEMO_SET,
    TX_UNBOND_MODAL_HIDE,
    TX_UNBOND_MODAL_SHOW,
    TX_UNBOND_SUCCESS,
    TX_UNBOND_URL,
} from '../../constants/transactions';

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

export const txUnbond = (body, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txUnbondInProgress());
            next(null);
        }, (next) => {
            Axios.post(TX_UNBOND_URL, body)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

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
