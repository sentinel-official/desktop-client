import Axios from 'axios';
import {
    DELETE_ACCOUNT_DIALOG_HIDE,
    DELETE_ACCOUNT_DIALOG_SHOW,
    DELETE_ACCOUNT_PASSWORD_SET,
    FAUCET_TRANSFER_FETCH_ERROR,
    FAUCET_TRANSFER_FETCH_IN_PROGRESS,
    FAUCET_TRANSFER_FETCH_SUCCESS,
    NEW_ACCOUNT_NAME_SET,
    NEW_ACCOUNT_PASSWORD_SET,
    PROFILE_POPOVER_HIDE,
    PROFILE_POPOVER_SHOW,
    SEED_SET,
} from '../constants/navbar';
import { FAUCET_URL } from '../constants/url';

export const showProfilePopover = (value) => {
    return {
        type: PROFILE_POPOVER_SHOW,
        value,
    };
};

export const hideProfilePopover = () => {
    return {
        type: PROFILE_POPOVER_HIDE,
    };
};

export const showDeleteAccountDialog = (value) => {
    return {
        type: DELETE_ACCOUNT_DIALOG_SHOW,
        value,
    };
};

export const hideDeleteAccountDialog = () => {
    return {
        type: DELETE_ACCOUNT_DIALOG_HIDE,
    };
};

export const setDeleteAccountPassword = (value) => {
    return {
        type: DELETE_ACCOUNT_PASSWORD_SET,
        value,
    };
};

export const setNewAccountName = (value) => {
    return {
        type: NEW_ACCOUNT_NAME_SET,
        value,
    };
};

export const setNewAccountPassword = (value) => {
    return {
        type: NEW_ACCOUNT_PASSWORD_SET,
        value,
    };
};

export const setSeed = (value) => {
    return {
        type: SEED_SET,
        value,
    };
};

const fetchFaucetInProgress = () => {
    return {
        type: FAUCET_TRANSFER_FETCH_IN_PROGRESS,
    };
};

const fetchFaucetSuccess = (message, hash) => {
    return {
        type: FAUCET_TRANSFER_FETCH_SUCCESS,
        message,
        hash,
    };
};

const fetchFaucetError = (error) => {
    return {
        type: FAUCET_TRANSFER_FETCH_ERROR,
        error,
    };
};

export const fetchFaucet = (data, cb) => (dispatch) => {
    dispatch(fetchFaucetInProgress());

    Axios.post(FAUCET_URL, data)
        .then((res) => {
            dispatch(fetchFaucetSuccess('Success', res.data.result.txhash));
            cb(null);
        })
        .catch((error) => {
            dispatch(fetchFaucetError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};
