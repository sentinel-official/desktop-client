import { combineReducers } from 'redux';
import {
    WITHDRAW_DIALOG_HIDE,
    WITHDRAW_DIALOG_SHOW,
    WITHDRAW_ERROR,
    WITHDRAW_IN_PROGRESS,
    WITHDRAW_PASSWORD_SET,
    WITHDRAW_SUCCESS,
    WITHDRAW_SUCCESS_DIALOG_HIDE,
    WITHDRAW_SUCCESS_DIALOG_SHOW,
} from '../../constants/distribution';
import { OUT_OF_GAS } from '../../constants/staking';

const open = (state = false, action) => {
    switch (action.type) {
    case WITHDRAW_DIALOG_SHOW:
        return true;
    case WITHDRAW_DIALOG_HIDE:
    case WITHDRAW_SUCCESS_DIALOG_SHOW:
        return false;
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case WITHDRAW_PASSWORD_SET:
        return action.value;
    case WITHDRAW_DIALOG_HIDE:
    case WITHDRAW_SUCCESS_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const success = (state = false, action) => {
    switch (action.type) {
    case WITHDRAW_SUCCESS_DIALOG_SHOW:
        return true;
    case WITHDRAW_SUCCESS_DIALOG_HIDE:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case WITHDRAW_IN_PROGRESS:
        return true;
    case WITHDRAW_SUCCESS:
    case WITHDRAW_ERROR:
    case OUT_OF_GAS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    open,
    password,
    success,
    inProgress,
});
