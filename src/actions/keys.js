import Async from 'async';
import { emptyFunc } from '../constants/common';
import {
    KEY_MNEMONIC_SET,
    KEY_NAME_SET,
    KEY_PASSWORD_SET,
    KEYS_GET_ERROR,
    KEYS_GET_IN_PROGRESS,
    KEYS_GET_SUCCESS,
    KEYS_GET_URL,
    KEYS_POST_ERROR,
    KEYS_POST_IN_PROGRESS,
    KEYS_POST_SUCCESS,
    KEYS_POST_URL,
} from '../constants/keys';
import Axios from '../services/axios';

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

export const getKeys = (history, cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getKeysInProgress(null));
            next(null);
        }, (next) => {
            Axios.get(KEYS_GET_URL)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getKeysError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getKeysSuccess(result));
            next(null);
        }, (next) => {
            const { keys } = getState();

            if (keys.items.length === 0) {
                history.push('/keys');
                next(new Error(''));
            } else {
                next(null);
            }
        },
    ], cb);
};

export const setKeyName = (data) => {
    return {
        type: KEY_NAME_SET,
        data,
    };
};

export const setKeyPassword = (data) => {
    return {
        type: KEY_PASSWORD_SET,
        data,
    };
};

export const setKeyMnemonic = (data) => {
    return {
        type: KEY_MNEMONIC_SET,
        data,
    };
};

export const postKeysInProgress = (data) => {
    return {
        type: KEYS_POST_IN_PROGRESS,
        data,
    };
};

export const postKeysSuccess = (data) => {
    return {
        type: KEYS_POST_SUCCESS,
        data,
    };
};

export const postKeysError = (data) => {
    return {
        type: KEYS_POST_ERROR,
        data,
    };
};

export const postKeys = (history, cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(postKeysInProgress(null));
            next(null);
        }, (next) => {
            const { keys } = getState();

            Axios.post(KEYS_POST_URL, {
                mnemonic: keys.post.mnemonic.value.trim(),
                name: keys.post.name.value.trim(),
                password: keys.post.password.value.trim(),
            }).then((res) => {
                try {
                    next(null, res?.data?.result);
                } catch (e) {
                    console.error(e);
                }
            }).catch((error) => {
                console.error(error);

                dispatch(postKeysError(error?.response?.data?.error || error));
                next(error);
            });
        }, (result, next) => {
            dispatch(postKeysSuccess(result));
            next(null);
        }, (next) => {
            const { keys } = getState();

            history.push(`/keys/${keys.post.info.name}`);
            next(new Error(''));
        },
    ], cb);
};
