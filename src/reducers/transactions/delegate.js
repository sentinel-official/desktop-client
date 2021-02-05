import { combineReducers } from 'redux';
import {
    TX_DELEGATE_AMOUNT_SET,
    TX_DELEGATE_ERROR,
    TX_DELEGATE_IN_PROGRESS,
    TX_DELEGATE_MEMO_SET,
    TX_DELEGATE_MODAL_HIDE,
    TX_DELEGATE_MODAL_SHOW,
    TX_DELEGATE_SUCCESS,
    TX_DELEGATE_TO_SET,
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
    case TX_DELEGATE_TO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_DELEGATE_SUCCESS:
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
    value: [],
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_DELEGATE_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_DELEGATE_SUCCESS:
        return {
            ...state,
            value: [],
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
    case TX_DELEGATE_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_DELEGATE_SUCCESS:
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
    case TX_DELEGATE_IN_PROGRESS:
        return true;
    case TX_DELEGATE_ERROR:
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
    case TX_DELEGATE_MODAL_SHOW:
        return true;
    case TX_DELEGATE_MODAL_HIDE:
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
