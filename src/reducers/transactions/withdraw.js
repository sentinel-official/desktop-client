import { combineReducers } from 'redux';
import {
    TX_DELEGATE_SUCCESS,
    TX_WITHDRAW_ERROR,
    TX_WITHDRAW_FROM_SET,
    TX_WITHDRAW_IN_PROGRESS,
    TX_WITHDRAW_MEMO_SET,
    TX_WITHDRAW_MODAL_HIDE,
    TX_WITHDRAW_MODAL_SHOW,
    TX_WITHDRAW_SUCCESS,
} from '../../constants/transactions';

const from = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_WITHDRAW_FROM_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_WITHDRAW_SUCCESS:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const memo = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_WITHDRAW_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_WITHDRAW_SUCCESS:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_WITHDRAW_IN_PROGRESS:
        return true;
    case TX_WITHDRAW_ERROR:
    case TX_DELEGATE_SUCCESS:
        return false;
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_WITHDRAW_MODAL_SHOW:
        return true;
    case TX_WITHDRAW_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    from,
    memo,
    inProgress,
    modal,
});
