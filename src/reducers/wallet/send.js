import { combineReducers } from 'redux';
import { WITHDRAW_ALL_SUCCESS } from '../../constants/distribution';
import { DELEGATE_SUCCESS_DIALOG_HIDE, OUT_OF_GAS, RE_DELEGATE_SUCCESS_DIALOG_HIDE } from '../../constants/staking';
import {
    ADDRESS_TO_SEND_SET,
    GAS_PRICE_DECREMENT_SET,
    GAS_PRICE_INCREMENT_SET,
    GAS_PRICE_SET,
    PASSWORD_SET,
    TOKEN_TYPE_SET,
    TOKENS_TO_SEND_SET,
    TRANSFER_TOKENS_ERROR,
    TRANSFER_TOKENS_IN_PROGRESS,
    TRANSFER_TOKENS_SUCCESS,
} from '../../constants/wallet';
import tokenTypes from '../../dummy/tokenTypes';

const addressToSend = (state = '', action) => {
    switch (action.type) {
    case ADDRESS_TO_SEND_SET:
        return action.value;
    case TRANSFER_TOKENS_SUCCESS:
        return '';
    default:
        return state;
    }
};

const tokensToSend = (state = '', action) => {
    switch (action.type) {
    case TOKENS_TO_SEND_SET:
        return action.value;
    case TRANSFER_TOKENS_SUCCESS:
        return '';
    default:
        return state;
    }
};

const tokenType = (state = tokenTypes, action) => {
    return state;
};

const sentToken = (state = 'TSENT', action) => {
    if (action.type === TOKEN_TYPE_SET) {
        return action.value;
    }

    return state;
};

const token = (state = 'tsent', action) => {
    return state;
};

const gasPrice = (state = '60000', action) => {
    switch (action.type) {
    case GAS_PRICE_SET:
        return action.value;
    case GAS_PRICE_INCREMENT_SET:
        return String(parseInt(state) + 1);
    case GAS_PRICE_DECREMENT_SET:
        return String(parseInt(state) - 1);
    case RE_DELEGATE_SUCCESS_DIALOG_HIDE:
    case WITHDRAW_ALL_SUCCESS:
    case DELEGATE_SUCCESS_DIALOG_HIDE:
        return '60000';
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case PASSWORD_SET:
        return action.value;
    case TRANSFER_TOKENS_SUCCESS:
        return '';
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case TRANSFER_TOKENS_IN_PROGRESS:
        return true;
    case TRANSFER_TOKENS_SUCCESS:
    case TRANSFER_TOKENS_ERROR:
    case OUT_OF_GAS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    addressToSend,
    tokensToSend,
    tokenType,
    token,
    gasPrice,
    password,
    inProgress,
    sentToken,
});
