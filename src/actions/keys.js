import {
    KEYS_GET_ERROR,
    KEYS_GET_IN_PROGRESS,
    KEYS_GET_SUCCESS,
    KEYS_PASSWORD_VISIBLE_SET,
    KEYS_POST_ERROR,
    KEYS_POST_IN_PROGRESS,
    KEYS_POST_SUCCESS,
    KEY_MNEMONIC_SET,
    KEY_NAME_SET,
    KEY_PASSWORD_SET,
    keysGetURL,
    keysPostURL,
} from '../constants/keys';
import { emptyFunc } from '../constants/common';
import Async from 'async';
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
            const url = keysGetURL();
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

export const setKeyPasswordVisible = (data) => {
    return {
        type: KEYS_PASSWORD_VISIBLE_SET,
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
            const {
                keys: {
                    post: {
                        mnemonic,
                        name,
                        password,
                    },
                },
            } = getState();

            const url = keysPostURL();
            Axios.post(url, {
                mnemonic: mnemonic.value.trim(),
                name: name.value.trim(),
                password: password.value.trim(),
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
