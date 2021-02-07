import Async from 'async';
import Axios from 'axios';
import {
    TX_DELEGATE_AMOUNT_SET,
    TX_DELEGATE_ERROR,
    TX_DELEGATE_IN_PROGRESS,
    TX_DELEGATE_MEMO_SET,
    TX_DELEGATE_MODAL_HIDE,
    TX_DELEGATE_MODAL_SHOW,
    TX_DELEGATE_SUCCESS,
    TX_DELEGATE_TO_SET,
    TX_DELEGATE_URL,
} from '../../constants/transactions';

export const setTxDelegateTo = (data) => {
    return {
        type: TX_DELEGATE_TO_SET,
        data,
    };
};

export const setTxDelegateAmount = (data) => {
    return {
        type: TX_DELEGATE_AMOUNT_SET,
        data,
    };
};

export const setTxDelegateMemo = (data) => {
    return {
        type: TX_DELEGATE_MEMO_SET,
        data,
    };
};

export const txDelegateInProgress = (data) => {
    return {
        type: TX_DELEGATE_IN_PROGRESS,
        data,
    };
};

export const txDelegateSuccess = (data) => {
    return {
        type: TX_DELEGATE_SUCCESS,
        data,
    };
};

export const txDelegateError = (data) => {
    return {
        type: TX_DELEGATE_ERROR,
        data,
    };
};

export const txDelegate = (body, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txDelegateInProgress());
            next(null);
        }, (next) => {
            Axios.post(TX_DELEGATE_URL, body)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    dispatch(txDelegateError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txDelegateSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxDelegateModal = (data) => {
    return {
        type: TX_DELEGATE_MODAL_SHOW,
        data,
    };
};

export const hideTxDelegateModal = (data) => {
    return {
        type: TX_DELEGATE_MODAL_HIDE,
        data,
    };
};
