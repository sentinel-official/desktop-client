import { combineReducers } from 'redux';
import {
    TX_REDELEGATE_AMOUNT_SET,
    TX_REDELEGATE_ERROR,
    TX_REDELEGATE_FROM_SET,
    TX_REDELEGATE_IN_PROGRESS,
    TX_REDELEGATE_MEMO_SET,
    TX_REDELEGATE_SUCCESS,
    TX_REDELEGATE_TO_SET,
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
    case TX_REDELEGATE_FROM_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_REDELEGATE_SUCCESS:
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
    case TX_REDELEGATE_TO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_REDELEGATE_SUCCESS:
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
    case TX_REDELEGATE_AMOUNT_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_REDELEGATE_SUCCESS:
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
    case TX_REDELEGATE_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_REDELEGATE_SUCCESS:
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
    case TX_REDELEGATE_IN_PROGRESS:
        return true;
    case TX_REDELEGATE_ERROR:
    case TX_REDELEGATE_SUCCESS:
        return false;
    default:
        return state;
    }
};

const info = (state = {
    tx_hash: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_REDELEGATE_SUCCESS:
        return {
            ...state,
            tx_hash: data['tx_hash'],
        };
    default:
        return state;
    }
};

export default combineReducers({
    from,
    to,
    amount,
    memo,
    inProgress,
    info,
});
