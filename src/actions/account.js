import {
    ACCOUNT_GET_ERROR,
    ACCOUNT_GET_IN_PROGRESS,
    ACCOUNT_GET_SUCCESS,
    ACCOUNT_PASSWORD_SET,
    getAccountURL,
} from '../constants/account';
import { emptyFunc } from '../constants/common';
import Async from 'async';
import Axios from '../services/axios';

export const getAccountInProgress = (data) => {
    return {
        type: ACCOUNT_GET_IN_PROGRESS,
        data,
    };
};

export const getAccountSuccess = (data) => {
    return {
        type: ACCOUNT_GET_SUCCESS,
        data,
    };
};

export const getAccountError = (data) => {
    return {
        type: ACCOUNT_GET_ERROR,
        data,
    };
};

export const getAccount = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getAccountInProgress(null));
            next(null);
        }, (next) => {
            const {
                keys: {
                    items,
                    index,
                },
            } = getState();

            const url = getAccountURL(items[index].address);
            Axios.get(url)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getAccountError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getAccountSuccess(result));
            next(null);
        },
    ], cb);
};

export const setAccountPassword = (data) => {
    return {
        type: ACCOUNT_PASSWORD_SET,
        data,
    };
};
