import Async from 'async';
import Axios from 'axios';
import { KEYS_GET_ERROR, KEYS_GET_IN_PROGRESS, KEYS_GET_SUCCESS, KEYS_GET_URL } from '../constants/keys';

export const getKeysInProgress = (data) => {
    return {
        type: KEYS_GET_IN_PROGRESS,
        data,
    };
};

export const getKeysSuccess = (data) => {
    return {
        type: KEYS_GET_SUCCESS,
        data,
    };
};

export const getKeysError = (data) => {
    return {
        type: KEYS_GET_ERROR,
        data,
    };
};

export const getKeys = (history, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getKeysInProgress(null));
            next(null);
        }, (next) => {
            const { authentication } = getState();

            Axios.get(KEYS_GET_URL, {
                headers: {
                    Authorization: `Bearer ${authentication.info.value}`,
                },
            })
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    dispatch(getKeysError(error?.response?.data?.error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getKeysSuccess(result));
            next(null);
        }, (next) => {
            const { keys } = getState();

            if (keys.items.length) {
                history.push('/dashboard');
                next(new Error(''));
            } else {
                history.push('/keys');
                next(new Error(''));
            }
        },
    ], cb);
};
