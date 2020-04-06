import Axios from 'axios';
import {
    RE_DELEGATE_AMOUNT_SET,
    RE_DELEGATE_DIALOG_HIDE,
    RE_DELEGATE_DIALOG_SHOW,
    RE_DELEGATE_ERROR,
    RE_DELEGATE_IN_PROGRESS,
    RE_DELEGATE_PASSWORD_SET,
    RE_DELEGATE_SEARCH_VALIDATOR_LIST_SET,
    RE_DELEGATE_SORT_ORDER_BY_SET,
    RE_DELEGATE_SORT_ORDER_SET,
    RE_DELEGATE_SUCCESS,
    RE_DELEGATE_SUCCESS_DIALOG_HIDE,
    RE_DELEGATE_SUCCESS_DIALOG_SHOW,
    RE_DELEGATE_TO_ADDRESS_SET,
} from '../constants/staking';
import { reDelegateURL } from '../constants/url';
import { outOfGas } from './staking';

export const setReDelegateSearchList = (value) => {
    return {
        type: RE_DELEGATE_SEARCH_VALIDATOR_LIST_SET,
        value,
    };
};

export const setSortOrder = (value) => {
    return {
        type: RE_DELEGATE_SORT_ORDER_SET,
        value,
    };
};

export const setSortOrderBy = (value) => {
    return {
        type: RE_DELEGATE_SORT_ORDER_BY_SET,
        value,
    };
};

export const showReDelegateDialog = (value) => {
    return {
        type: RE_DELEGATE_DIALOG_SHOW,
        value,
    };
};

export const hideReDelegateDialog = () => {
    return {
        type: RE_DELEGATE_DIALOG_HIDE,
    };
};

export const setAmount = (value) => {
    return {
        type: RE_DELEGATE_AMOUNT_SET,
        value,
    };
};

export const setPassword = (value) => {
    return {
        type: RE_DELEGATE_PASSWORD_SET,
        value,
    };
};

export const setToAddress = (value) => {
    return {
        type: RE_DELEGATE_TO_ADDRESS_SET,
        value,
    };
};

export const showReDelegateSuccessDialog = () => {
    return {
        type: RE_DELEGATE_SUCCESS_DIALOG_SHOW,
    };
};

export const hideReDelegateSuccessDialog = () => {
    return {
        type: RE_DELEGATE_SUCCESS_DIALOG_HIDE,
    };
};

const reDelegateInProgress = () => {
    return {
        type: RE_DELEGATE_IN_PROGRESS,
    };
};

const reDelegateSuccess = (value) => {
    return {
        type: RE_DELEGATE_SUCCESS,
        value,
    };
};

const reDelegateError = (error) => {
    return {
        type: RE_DELEGATE_ERROR,
        error,
    };
};

export const reDelegate = (data, address, cb) => (dispatch) => {
    dispatch(reDelegateInProgress());

    const url = reDelegateURL(address);
    Axios.put(url, data)
        .then((res) => {
            if (res.data.result.code === 12) {
                dispatch(outOfGas('Out of Gas'));
                cb(res);
            } else {
                dispatch(reDelegateSuccess(res.data.result.txhash));
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(reDelegateError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};
