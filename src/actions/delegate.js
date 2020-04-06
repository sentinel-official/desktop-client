import Axios from 'axios';
import {
    DELEGATE_ACTIVE_LIST_HIDE,
    DELEGATE_ACTIVE_LIST_SHOW,
    DELEGATE_AMOUNT_SET,
    DELEGATE_DIALOG_HIDE,
    DELEGATE_DIALOG_SHOW,
    DELEGATE_PASSWORD_SET,
    DELEGATE_SUCCESS_DIALOG_HIDE,
    DELEGATE_SUCCESS_DIALOG_SHOW,
    DELEGATION_ERROR,
    DELEGATION_IN_PROGRESS,
    DELEGATION_SUCCESS,
    SEARCH_VALIDATOR_LIST_SET,
    SORT_ORDER_BY_SET,
    SORT_ORDER_SET,
} from '../constants/staking';
import { delegationURL } from '../constants/url';
import { outOfGas } from './staking';

export const showActiveList = () => {
    return {
        type: DELEGATE_ACTIVE_LIST_SHOW,
    };
};

export const hideActiveList = () => {
    return {
        type: DELEGATE_ACTIVE_LIST_HIDE,
    };
};

export const setSearchList = (value) => {
    return {
        type: SEARCH_VALIDATOR_LIST_SET,
        value,
    };
};

export const setSortOrder = (value) => {
    return {
        type: SORT_ORDER_SET,
        value,
    };
};

export const setSortOrderBy = (value) => {
    return {
        type: SORT_ORDER_BY_SET,
        value,
    };
};

export const showDelegateDialog = (value) => {
    return {
        type: DELEGATE_DIALOG_SHOW,
        value,
    };
};

export const hideDelegateDialog = () => {
    return {
        type: DELEGATE_DIALOG_HIDE,
    };
};

export const setAmount = (value) => {
    return {
        type: DELEGATE_AMOUNT_SET,
        value,
    };
};

export const setPassword = (value) => {
    return {
        type: DELEGATE_PASSWORD_SET,
        value,
    };
};

export const showDelegateSuccessDialog = () => {
    return {
        type: DELEGATE_SUCCESS_DIALOG_SHOW,
    };
};

export const hideDelegateSuccessDialog = () => {
    return {
        type: DELEGATE_SUCCESS_DIALOG_HIDE,
    };
};

const delegationInProgress = () => {
    return {
        type: DELEGATION_IN_PROGRESS,
    };
};

const delegationSuccess = (value) => {
    return {
        type: DELEGATION_SUCCESS,
        value,
    };
};

const delegationError = (error) => {
    return {
        type: DELEGATION_ERROR,
        error,
    };
};

export const delegation = (data, address, cb) => (dispatch) => {
    dispatch(delegationInProgress());

    const url = delegationURL(address);
    Axios.post(url, data)
        .then((res) => {
            if (res.data.result.code === 12) {
                dispatch(outOfGas('Out of Gas'));
                cb(res);
            } else {
                dispatch(delegationSuccess(res.data.result.txhash));
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(delegationError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};
