import { combineReducers } from 'redux';
import {
    TX_UNBOND_AMOUNT_SET,
    TX_UNBOND_ERROR,
    TX_UNBOND_FROM_SET,
    TX_UNBOND_IN_PROGRESS,
    TX_UNBOND_MEMO_SET,
    TX_UNBOND_MODAL_HIDE,
    TX_UNBOND_MODAL_SHOW,
    TX_UNBOND_SUCCESS,
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
    case TX_UNBOND_FROM_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_UNBOND_SUCCESS:
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
    case TX_UNBOND_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_UNBOND_SUCCESS:
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
    case TX_UNBOND_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_UNBOND_SUCCESS:
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
    case TX_UNBOND_IN_PROGRESS:
        return true;
    case TX_UNBOND_ERROR:
    case TX_UNBOND_SUCCESS:
        return false;
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_UNBOND_MODAL_SHOW:
        return true;
    case TX_UNBOND_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    from,
    amount,
    memo,
    inProgress,
    modal,
});
