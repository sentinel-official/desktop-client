import { combineReducers } from 'redux';
import {
    OUT_OF_GAS,
    UN_BOND_AMOUNT_SET,
    UN_BOND_DIALOG_HIDE,
    UN_BOND_DIALOG_SHOW,
    UN_BOND_ERROR,
    UN_BOND_IN_PROGRESS,
    UN_BOND_PASSWORD_SET,
    UN_BOND_SUCCESS,
    UN_BOND_SUCCESS_DIALOG_HIDE,
    UN_BOND_SUCCESS_DIALOG_SHOW,
} from '../../constants/staking';

const open = (state = false, action) => {
    switch (action.type) {
    case UN_BOND_DIALOG_SHOW:
        return true;
    case UN_BOND_DIALOG_HIDE:
    case UN_BOND_SUCCESS_DIALOG_SHOW:
        return false;
    default:
        return state;
    }
};

const amount = (state = '', action) => {
    if (action.type === UN_BOND_AMOUNT_SET) {
        return action.value;
    }

    return state;
};

const password = (state = '', action) => {
    if (action.type === UN_BOND_PASSWORD_SET) {
        return action.value;
    }

    return state;
};

const success = (state = false, action) => {
    switch (action.type) {
    case UN_BOND_SUCCESS_DIALOG_SHOW:
        return true;
    case UN_BOND_SUCCESS_DIALOG_HIDE:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case UN_BOND_IN_PROGRESS:
        return true;
    case UN_BOND_SUCCESS:
    case UN_BOND_ERROR:
    case OUT_OF_GAS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    open,
    amount,
    password,
    success,
    inProgress,
});
