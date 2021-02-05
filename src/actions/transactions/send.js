import Async from 'async';
import Axios from 'axios';
import {
    TX_SEND_AMOUNT_SET,
    TX_SEND_ERROR,
    TX_SEND_IN_PROGRESS,
    TX_SEND_MEMO_SET,
    TX_SEND_SUCCESS,
    TX_SEND_TO_SET,
    TX_SEND_URL,
} from '../../constants/transactions';

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

export const txSend = (body, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txSendInProgress());
            next(null);
        }, (next) => {
            Axios.post(TX_SEND_URL, body)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(txSendError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txSendSuccess(result));
            next(null);
        },
    ], cb);
};
