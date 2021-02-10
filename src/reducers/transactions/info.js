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
    case TX_DELEGATE_SUCCESS:
    case TX_REDELEGATE_SUCCESS:
    case TX_SEND_SUCCESS:
    case TX_UNBOND_SUCCESS:
    case TX_VOTE_SUCCESS:
    case TX_WITHDRAW_SUCCESS:
        return data.txhash;
    case TX_INFO_MODAL_HIDE:
        return '';
    default:
        return state;
    }
};

const error = (state = {
    code: 0,
    message: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_DELEGATE_ERROR:
    case TX_REDELEGATE_ERROR:
    case TX_SEND_ERROR:
    case TX_UNBOND_ERROR:
    case TX_VOTE_ERROR:
    case TX_WITHDRAW_ERROR:
        return {
            ...state,
            code: data.code,
            message: data.message,
        };
    case TX_INFO_MODAL_HIDE:
        return {
            ...state,
            code: 0,
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
    case TX_DELEGATE_ERROR:
    case TX_DELEGATE_SUCCESS:
    case TX_REDELEGATE_ERROR:
    case TX_REDELEGATE_SUCCESS:
    case TX_SEND_ERROR:
    case TX_SEND_SUCCESS:
    case TX_UNBOND_ERROR:
    case TX_UNBOND_SUCCESS:
    case TX_VOTE_ERROR:
    case TX_VOTE_SUCCESS:
    case TX_WITHDRAW_ERROR:
    case TX_WITHDRAW_SUCCESS:
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
