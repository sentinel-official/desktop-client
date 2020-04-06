import { combineReducers } from 'redux';
import {
    DELEGATE_AMOUNT_SET,
    DELEGATE_DIALOG_HIDE,
    DELEGATE_DIALOG_SHOW,
    DELEGATE_PASSWORD_SET,
    DELEGATE_SUCCESS_DIALOG_HIDE,
    DELEGATE_SUCCESS_DIALOG_SHOW,
    DELEGATION_ERROR,
    DELEGATION_IN_PROGRESS,
    DELEGATION_SUCCESS,
    OUT_OF_GAS,
} from '../../constants/staking';

const open = (state = false, action) => {
    switch (action.type) {
    case DELEGATE_DIALOG_SHOW:
        return true;
    case DELEGATE_DIALOG_HIDE:
    case DELEGATE_SUCCESS_DIALOG_SHOW:
        return false;
    default:
        return state;
    }
};

const amount = (state = '', action) => {
    switch (action.type) {
    case DELEGATE_AMOUNT_SET:
        return action.value;
    case DELEGATE_SUCCESS_DIALOG_HIDE:
    case DELEGATE_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case DELEGATE_PASSWORD_SET:
        return action.value;
    case DELEGATE_SUCCESS_DIALOG_HIDE:
    case DELEGATE_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const success = (state = false, action) => {
    switch (action.type) {
    case DELEGATE_SUCCESS_DIALOG_SHOW:
        return true;
    case DELEGATE_SUCCESS_DIALOG_HIDE:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case DELEGATION_IN_PROGRESS:
        return true;
    case DELEGATION_SUCCESS:
    case DELEGATION_ERROR:
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
