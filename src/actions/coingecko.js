import Async from 'async';
import Axios from 'axios';
import {
    COINGECKO_GET_ERROR,
    COINGECKO_GET_IN_PROGRESS,
    COINGECKO_GET_SUCCESS,
    COINGECKO_GET_URL,
} from '../constants/coingecko';

export const getCoinGeckoInProgress = (data) => {
    return {
        type: COINGECKO_GET_IN_PROGRESS,
        data,
    };
};

export const getCoinGeckoSuccess = (data) => {
    return {
        type: COINGECKO_GET_SUCCESS,
        data,
    };
};

export const getCoinGeckoError = (data) => {
    return {
        type: COINGECKO_GET_ERROR,
        data,
    };
};

export const getCoinGecko = (cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getCoinGeckoInProgress(null));
            next(null);
        }, (next) => {
            Axios.get(COINGECKO_GET_URL)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getCoinGeckoError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getCoinGeckoSuccess(result));
            next(null);
        },
    ], cb);
};
