import { combineReducers } from 'redux';
import {
    OUT_OF_GAS,
    RE_DELEGATE_AMOUNT_SET,
    RE_DELEGATE_DIALOG_HIDE,
    RE_DELEGATE_DIALOG_SHOW,
    RE_DELEGATE_ERROR,
    RE_DELEGATE_IN_PROGRESS,
    RE_DELEGATE_PASSWORD_SET,
    RE_DELEGATE_SUCCESS,
    RE_DELEGATE_SUCCESS_DIALOG_HIDE,
    RE_DELEGATE_SUCCESS_DIALOG_SHOW,
    RE_DELEGATE_TO_ADDRESS_SET,
} from '../../constants/staking';

const open = (state = false, action) => {
    switch (action.type) {
    case RE_DELEGATE_DIALOG_SHOW:
        return true;
    case RE_DELEGATE_DIALOG_HIDE:
    case RE_DELEGATE_SUCCESS_DIALOG_SHOW:
        return false;
    default:
        return state;
    }
};

const amount = (state = '', action) => {
    switch (action.type) {
    case RE_DELEGATE_AMOUNT_SET:
        return action.value;
    case RE_DELEGATE_SUCCESS_DIALOG_HIDE:
    case RE_DELEGATE_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case RE_DELEGATE_PASSWORD_SET:
        return action.value;
    case RE_DELEGATE_SUCCESS_DIALOG_HIDE:
    case RE_DELEGATE_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const toAddress = (state = {}, action) => {
    switch (action.type) {
    case RE_DELEGATE_TO_ADDRESS_SET:
        return action.value;
    case RE_DELEGATE_SUCCESS_DIALOG_HIDE:
    case RE_DELEGATE_DIALOG_HIDE:
        return {};
    default:
        return state;
    }
};

const success = (state = false, action) => {
    switch (action.type) {
    case RE_DELEGATE_SUCCESS_DIALOG_SHOW:
        return true;
    case RE_DELEGATE_SUCCESS_DIALOG_HIDE:
        return false;
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case RE_DELEGATE_IN_PROGRESS:
        return true;
    case RE_DELEGATE_SUCCESS:
    case RE_DELEGATE_ERROR:
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
    toAddress,
    success,
    inProgress,
});
