import {
    KEYS_CREATE_MODAL_HIDE,
    KEYS_CREATE_MODAL_SHOW,
    KEYS_DELETE_ERROR,
    KEYS_DELETE_IN_PROGRESS,
    KEYS_DELETE_NAME_SET,
    KEYS_DELETE_PASSWORD_SET,
    KEYS_DELETE_PASSWORD_VISIBLE_SET,
    KEYS_DELETE_SUCCESS,
    KEYS_GET_ERROR,
    KEYS_GET_IN_PROGRESS,
    KEYS_GET_SUCCESS,
    KEYS_INFO_MODAL_HIDE,
    KEYS_INFO_MODAL_SHOW,
    KEYS_LIST_MODAL_HIDE,
    KEYS_LIST_MODAL_SHOW,
    KEYS_NAME_SET,
    KEYS_PASSWORD_VISIBLE_SET,
    KEYS_POST_ERROR,
    KEYS_POST_IN_PROGRESS,
    KEYS_POST_SUCCESS,
    KEY_MNEMONIC_SAVED_SET,
    KEY_MNEMONIC_SET,
    KEY_NAME_SET,
    KEY_PASSWORD_SET,
    keysDeleteURL,
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

export const setKeyMnemonicSaved = (data) => {
    return {
        type: KEY_MNEMONIC_SAVED_SET,
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
            if (history) {
                const { keys } = getState();

                history.push(`/keys/${keys.post.info.name}`);
                next(new Error(''));
            } else {
                next(null);
            }
        },
    ], cb);
};

export const showKeysListModal = (data) => {
    return {
        type: KEYS_LIST_MODAL_SHOW,
        data,
    };
};

export const hideKeysListModal = (data) => {
    return {
        type: KEYS_LIST_MODAL_HIDE,
        data,
    };
};

export const showKeysCreateModal = (data) => {
    return {
        type: KEYS_CREATE_MODAL_SHOW,
        data,
    };
};

export const hideKeysCreateModal = (data) => {
    return {
        type: KEYS_CREATE_MODAL_HIDE,
        data,
    };
};

export const setKeysDeletePassword = (data) => {
    return {
        type: KEYS_DELETE_PASSWORD_SET,
        data,
    };
};

export const setKeysDeletePasswordVisible = (data) => {
    return {
        type: KEYS_DELETE_PASSWORD_VISIBLE_SET,
        data,
    };
};

export const setKeysDeleteNameSet = (data) => {
    return {
        type: KEYS_DELETE_NAME_SET,
        data,
    };
};

export const setKeysName = (data) => {
    return {
        type: KEYS_NAME_SET,
        data,
    };
};

export const showKeysInfoModal = (data) => {
    return {
        type: KEYS_INFO_MODAL_SHOW,
        data,
    };
};

export const hideKeysInfoModal = (data) => {
    return {
        type: KEYS_INFO_MODAL_HIDE,
        data,
    };
};

export const deleteKeysInProgress = (data) => {
    return {
        type: KEYS_DELETE_IN_PROGRESS,
        data,
    };
};

export const deleteKeysSuccess = (data) => {
    return {
        type: KEYS_DELETE_SUCCESS,
        data,
    };
};

export const deleteKeysError = (data) => {
    return {
        type: KEYS_DELETE_ERROR,
        data,
    };
};

export const deleteKeys = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(deleteKeysInProgress(null));
            next(null);
        }, (next) => {
            const {
                keys: {
                    delete: {
                        name,
                        password,
                    },
                },
            } = getState();

            const url = keysDeleteURL(name);
            Axios.post(url, {
                password: password.value.trim(),
            }).then((res) => {
                try {
                    next(null, res?.data?.result);
                } catch (e) {
                    console.error(e);
                }
            }).catch((error) => {
                console.error(error);

                dispatch(deleteKeysError(error?.response?.data?.error || error));
                next(error);
            });
        }, (result, next) => {
            dispatch(deleteKeysSuccess(result));
            next(null);
        },
    ], cb);
};
