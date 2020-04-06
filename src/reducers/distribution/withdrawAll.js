import { combineReducers } from 'redux';
import {
    WITHDRAW_ALL_DIALOG_HIDE,
    WITHDRAW_ALL_DIALOG_SHOW,
    WITHDRAW_ALL_ERROR,
    WITHDRAW_ALL_IN_PROGRESS,
    WITHDRAW_ALL_PASSWORD_SET,
    WITHDRAW_ALL_SUCCESS,
} from '../../constants/distribution';
import { OUT_OF_GAS } from '../../constants/staking';

const password = (state = '', action) => {
    switch (action.type) {
    case WITHDRAW_ALL_PASSWORD_SET:
        return action.value;
    case WITHDRAW_ALL_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const open = (state = false, action) => {
    switch (action.type) {
    case WITHDRAW_ALL_DIALOG_SHOW:
        return true;
    case WITHDRAW_ALL_DIALOG_HIDE:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case WITHDRAW_ALL_IN_PROGRESS:
        return true;
    case WITHDRAW_ALL_SUCCESS:
    case WITHDRAW_ALL_ERROR:
    case OUT_OF_GAS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    password,
    open,
    inProgress,
});
