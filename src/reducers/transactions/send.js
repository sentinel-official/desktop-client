import { combineReducers } from 'redux';
import {
    TX_SEND_AMOUNT_SET,
    TX_SEND_ERROR,
    TX_SEND_IN_PROGRESS,
    TX_SEND_MEMO_SET,
    TX_SEND_MODAL_HIDE,
    TX_SEND_MODAL_SHOW,
    TX_SEND_SUCCESS,
    TX_SEND_TO_SET,
} from '../../constants/transactions';

const to = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_SEND_TO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SEND_SUCCESS:
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

const amount = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_SEND_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SEND_SUCCESS:
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
    case TX_SEND_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_SEND_SUCCESS:
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
    case TX_SEND_IN_PROGRESS:
        return true;
    case TX_SEND_ERROR:
    case TX_SEND_SUCCESS:
        return false;
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_SEND_MODAL_SHOW:
        return true;
    case TX_SEND_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    to,
    amount,
    memo,
    inProgress,
    modal,
});
