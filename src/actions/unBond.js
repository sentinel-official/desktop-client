import Axios from 'axios';
import {
    UN_BOND_AMOUNT_SET,
    UN_BOND_DIALOG_HIDE,
    UN_BOND_DIALOG_SHOW,
    UN_BOND_ERROR,
    UN_BOND_IN_PROGRESS,
    UN_BOND_PASSWORD_SET,
    UN_BOND_SEARCH_VALIDATOR_LIST_SET,
    UN_BOND_SORT_ORDER_BY_SET,
    UN_BOND_SORT_ORDER_SET,
    UN_BOND_SUCCESS,
    UN_BOND_SUCCESS_DIALOG_HIDE,
    UN_BOND_SUCCESS_DIALOG_SHOW,
} from '../constants/staking';
import { unBondURL } from '../constants/url';
import { outOfGas } from './staking';

export const setUnBondSearchList = (value) => {
    return {
        type: UN_BOND_SEARCH_VALIDATOR_LIST_SET,
        value,
    };
};

export const setSortOrder = (value) => {
    return {
        type: UN_BOND_SORT_ORDER_SET,
        value,
    };
};

export const setSortOrderBy = (value) => {
    return {
        type: UN_BOND_SORT_ORDER_BY_SET,
        value,
    };
};

export const showUnBondDialog = (value) => {
    return {
        type: UN_BOND_DIALOG_SHOW,
        value,
    };
};

export const hideUnBondDialog = () => {
    return {
        type: UN_BOND_DIALOG_HIDE,
    };
};

export const setAmount = (value) => {
    return {
        type: UN_BOND_AMOUNT_SET,
        value,
    };
};

export const setPassword = (value) => {
    return {
        type: UN_BOND_PASSWORD_SET,
        value,
    };
};

export const showUnBondSuccessDialog = () => {
    return {
        type: UN_BOND_SUCCESS_DIALOG_SHOW,
    };
};

export const hideUnBondSuccessDialog = () => {
    return {
        type: UN_BOND_SUCCESS_DIALOG_HIDE,
    };
};

const unBondInProgress = () => {
    return {
        type: UN_BOND_IN_PROGRESS,
    };
};

const unBondSuccess = (value) => {
    return {
        type: UN_BOND_SUCCESS,
        value,
    };
};

const unBondError = (error) => {
    return {
        type: UN_BOND_ERROR,
        error,
    };
};

export const unBond = (data, address, cb) => (dispatch) => {
    dispatch(unBondInProgress());

    const url = unBondURL(address);
    Axios.delete(url, { data })
        .then((res) => {
            if (res.data.result.code === 12) {
                dispatch(outOfGas('Out of Gas'));
                cb(res);
            } else {
                dispatch(unBondSuccess(res.data.result.txhash));
                cb(null);
            }
        })
        .catch((error) => {
            dispatch(unBondError(error.response && error.response.data && error.response.data.error));
            cb(error);
        });
};
