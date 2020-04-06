import Axios from 'axios';
import {
    ACTIVE_ACCOUNT_SET,
    KEYS_ADD_ERROR,
    KEYS_ADD_IN_PROGRESS,
    KEYS_ADD_SUCCESS,
    KEYS_DELETE_ERROR,
    KEYS_DELETE_IN_PROGRESS,
    KEYS_DELETE_SUCCESS,
    KEYS_FETCH_ERROR,
    KEYS_FETCH_IN_PROGRESS,
    KEYS_FETCH_SUCCESS,
    LOCAL_STORAGE_SEED_SET,
} from '../constants/keys';
import { deleteAccountURL, KEYS_GET } from '../constants/url';

const fetchKeysInProgress = () => {
    return {
        type: KEYS_FETCH_IN_PROGRESS,
    };
};

const fetchKeysSuccess = (items) => {
    return {
        type: KEYS_FETCH_SUCCESS,
        items,
    };
};

const fetchKeysError = (error) => {
    return {
        type: KEYS_FETCH_ERROR,
        error,
    };
};

export const fetchKeys = (cb) => (dispatch) => {
    dispatch(fetchKeysInProgress());

    Axios.get(KEYS_GET)
        .then((res) => {
            dispatch(fetchKeysSuccess(res.data.result));

            if (cb) {
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(fetchKeysError(error.response && error.response.data && error.response.data.error));

            if (cb) {
                cb(error);
            }
        });
};

const addKeysInProgress = () => {
    return {
        type: KEYS_ADD_IN_PROGRESS,
    };
};

const addKeysSuccess = (items) => {
    return {
        type: KEYS_ADD_SUCCESS,
        items,
    };
};

const addKeysError = (error) => {
    return {
        type: KEYS_ADD_ERROR,
        error,
    };
};

export const addKeys = (data, cb) => (dispatch) => {
    dispatch(addKeysInProgress());

    Axios.post(KEYS_GET, data)
        .then((res) => {
            if (res.data.result) {
                localStorage.setItem('pub_key', res.data.result.pub_key && res.data.result.pub_key);
                localStorage.setItem('address', res.data.result.address && res.data.result.address);
                localStorage.setItem('mnemonic', res.data.result.mnemonic && res.data.result.mnemonic);
            }
            dispatch(addKeysSuccess(res.data.result));
            cb(null);
        })
        .catch((error) => {
            dispatch(addKeysError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};

export const setActiveAccount = (value) => {
    return {
        type: ACTIVE_ACCOUNT_SET,
        value,
    };
};

const deleteKeysInProgress = () => {
    return {
        type: KEYS_DELETE_IN_PROGRESS,
    };
};

const deleteKeysSuccess = (message) => {
    return {
        type: KEYS_DELETE_SUCCESS,
        message,
    };
};

const deleteKeysError = (error) => {
    return {
        type: KEYS_DELETE_ERROR,
        error,
    };
};

export const deleteKeys = (data, name, cb) => (dispatch) => {
    dispatch(deleteKeysInProgress());

    const url = deleteAccountURL(name);
    Axios.delete(url, { data: data })
        .then((res) => {
            dispatch(deleteKeysSuccess('Success'));
            cb(null);
        })
        .catch((error) => {
            dispatch(deleteKeysError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};

export const setLocalSeed = (value) => {
    return {
        type: LOCAL_STORAGE_SEED_SET,
        value,
    };
};
