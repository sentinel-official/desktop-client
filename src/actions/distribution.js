import Axios from 'axios';
import {
    DISTRIBUTION_TAB_VALUE_SET,
    WITHDRAW_ALL_DIALOG_HIDE,
    WITHDRAW_ALL_DIALOG_SHOW,
    WITHDRAW_ALL_ERROR,
    WITHDRAW_ALL_IN_PROGRESS,
    WITHDRAW_ALL_PASSWORD_SET,
    WITHDRAW_ALL_SUCCESS,
    WITHDRAW_DIALOG_HIDE,
    WITHDRAW_DIALOG_SHOW,
    WITHDRAW_ERROR,
    WITHDRAW_IN_PROGRESS,
    WITHDRAW_PASSWORD_SET,
    WITHDRAW_SEARCH_VALIDATOR_LIST_SET,
    WITHDRAW_SORT_ORDER_BY_SET,
    WITHDRAW_SORT_ORDER_SET,
    WITHDRAW_SUCCESS,
    WITHDRAW_SUCCESS_DIALOG_HIDE,
    WITHDRAW_SUCCESS_DIALOG_SHOW,
} from '../constants/distribution';
import { WITHDRAW_ALL_URL, withdrawURL } from '../constants/url';
import { outOfGas } from './staking';

export const setTabValue = (value) => {
    return {
        type: DISTRIBUTION_TAB_VALUE_SET,
        value,
    };
};

export const setWithdrawSearchList = (value) => {
    return {
        type: WITHDRAW_SEARCH_VALIDATOR_LIST_SET,
        value,
    };
};

export const setWithdrawAllPassword = (value) => {
    return {
        type: WITHDRAW_ALL_PASSWORD_SET,
        value,
    };
};

export const setSortOrder = (value) => {
    return {
        type: WITHDRAW_SORT_ORDER_SET,
        value,
    };
};

export const setSortOrderBy = (value) => {
    return {
        type: WITHDRAW_SORT_ORDER_BY_SET,
        value,
    };
};

export const showWithdrawDialog = (value) => {
    return {
        type: WITHDRAW_DIALOG_SHOW,
        value,
    };
};

export const hideWithdrawDialog = () => {
    return {
        type: WITHDRAW_DIALOG_HIDE,
    };
};

export const setWithdrawPassword = (value) => {
    return {
        type: WITHDRAW_PASSWORD_SET,
        value,
    };
};

export const showWithdrawSuccessDialog = () => {
    return {
        type: WITHDRAW_SUCCESS_DIALOG_SHOW,
    };
};

export const hideWithdrawSuccessDialog = () => {
    return {
        type: WITHDRAW_SUCCESS_DIALOG_HIDE,
    };
};

export const showWithdrawAllSuccessDialog = () => {
    return {
        type: WITHDRAW_ALL_DIALOG_SHOW,
    };
};

export const hideWithdrawAllSuccessDialog = () => {
    return {
        type: WITHDRAW_ALL_DIALOG_HIDE,
    };
};

const withdrawAllInProgress = () => {
    return {
        type: WITHDRAW_ALL_IN_PROGRESS,
    };
};

const withdrawAllSuccess = (value) => {
    return {
        type: WITHDRAW_ALL_SUCCESS,
        value,
    };
};

const withdrawAllError = (error) => {
    return {
        type: WITHDRAW_ALL_ERROR,
        error,
    };
};

export const withdrawAll = (data, cb) => (dispatch) => {
    dispatch(withdrawAllInProgress());

    Axios.post(WITHDRAW_ALL_URL, data)
        .then((res) => {
            if (res.data.result.code === 12) {
                dispatch(outOfGas('Out of Gas'));
                cb(res);
            } else {
                dispatch(withdrawAllSuccess(res.data.result.txhash));
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(withdrawAllError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};

const withdrawInProgress = () => {
    return {
        type: WITHDRAW_IN_PROGRESS,
    };
};

const withdrawSuccess = (value) => {
    return {
        type: WITHDRAW_SUCCESS,
        value,
    };
};

const withdrawError = (error) => {
    return {
        type: WITHDRAW_ERROR,
        error,
    };
};

export const withdraw = (data, address, cb) => (dispatch) => {
    dispatch(withdrawInProgress());

    const url = withdrawURL(address);
    Axios.post(url, data)
        .then((res) => {
            if (res.data.result.code === 12) {
                dispatch(outOfGas('Out of Gas'));
                cb(res);
            } else {
                dispatch(withdrawSuccess(res.data.result.txhash));
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(withdrawError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};
