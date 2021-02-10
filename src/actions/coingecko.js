import {
    COINGECKO_GET_ERROR,
    COINGECKO_GET_IN_PROGRESS,
    COINGECKO_GET_SUCCESS,
    COINGECKO_GET_URL,
} from '../constants/coingecko';
import { emptyFunc } from '../constants/common';
import Async from 'async';
import Axios from 'axios';

export const getCoingeckoInProgress = (data) => {
    return {
        type: COINGECKO_GET_IN_PROGRESS,
        data,
    };
};

export const getCoingeckoSuccess = (data) => {
    return {
        type: COINGECKO_GET_SUCCESS,
        data,
    };
};

export const getCoingeckoError = (data) => {
    return {
        type: COINGECKO_GET_ERROR,
        data,
    };
};

export const getCoingecko = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getCoingeckoInProgress(null));
            next(null);
        }, (next) => {
            Axios.get(COINGECKO_GET_URL)
                .then((res) => {
                    try {
                        next(null, res?.data);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getCoingeckoError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getCoingeckoSuccess(result));
            next(null);
        },
    ], cb);
};
