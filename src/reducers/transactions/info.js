import { combineReducers } from 'redux';
import {
    TX_DELEGATE_ERROR,
    TX_DELEGATE_SUCCESS,
    TX_INFO_MODAL_HIDE,
    TX_INFO_MODAL_SHOW,
    TX_REDELEGATE_ERROR,
    TX_REDELEGATE_SUCCESS,
    TX_SEND_ERROR,
    TX_SEND_SUCCESS,
    TX_UNBOND_ERROR,
    TX_UNBOND_SUCCESS,
    TX_VOTE_ERROR,
    TX_VOTE_SUCCESS,
    TX_WITHDRAW_ERROR,
    TX_WITHDRAW_SUCCESS,
} from '../../constants/transactions';

const txHash = (state = '', {
    type,
    data,
}) => {
    switch (type) {
    case TX_SEND_SUCCESS:
    case TX_SEND_ERROR:
    case TX_DELEGATE_SUCCESS:
    case TX_DELEGATE_ERROR:
    case TX_REDELEGATE_SUCCESS:
    case TX_REDELEGATE_ERROR:
    case TX_UNBOND_SUCCESS:
    case TX_UNBOND_ERROR:
    case TX_VOTE_SUCCESS:
    case TX_VOTE_ERROR:
    case TX_WITHDRAW_SUCCESS:
    case TX_WITHDRAW_ERROR:
        return data['tx_hash'];
    case TX_INFO_MODAL_HIDE:
        return '';
    default:
        return state;
    }
};

const error = (state = {
    code: 0,
    codespace: '',
    message: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_SEND_ERROR:
    case TX_DELEGATE_ERROR:
    case TX_REDELEGATE_ERROR:
    case TX_UNBOND_ERROR:
    case TX_VOTE_ERROR:
    case TX_WITHDRAW_ERROR:
        return {
            ...state,
            code: data.error.code,
            codespace: data.error.codespace,
            message: data.error.message,
        };
    case TX_INFO_MODAL_HIDE:
        return {
            ...state,
            code: 0,
            code_space: 0,
            message: '',
        };
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_INFO_MODAL_SHOW:
        return true;
    case TX_INFO_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    txHash,
    error,
    modal,
});
