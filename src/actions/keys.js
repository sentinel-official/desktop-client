import Async from 'async';
import Axios from 'axios';
import {
    KEYS_GET_ERROR,
    KEYS_GET_IN_PROGRESS,
    KEYS_GET_SUCCESS,
    KEYS_GET_URL,
    KEYS_POST_ERROR,
    KEYS_POST_IN_PROGRESS,
    KEYS_POST_SUCCESS,
    KEYS_POST_URL,
    KEY_MNEMONIC_SET,
    KEY_NAME_SET,
    KEY_PASSWORD_SET,
} from '../constants/keys';

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
                    console.error(error);

                    dispatch(getKeysError(error?.response?.data?.error || error));
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

export const postKeys = (body, history, cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(postKeysInProgress(null));
            next(null);
        }, (next) => {
            const { authentication } = getState();

            Axios.post(KEYS_POST_URL, body, {
                headers: {
                    Authorization: `Bearer ${authentication.info.value}`,
                },
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
