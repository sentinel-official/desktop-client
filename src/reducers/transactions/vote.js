import { combineReducers } from 'redux';
import {
    TX_UNBOND_MODAL_HIDE,
    TX_VOTE_ERROR,
    TX_VOTE_ID_SET,
    TX_VOTE_IN_PROGRESS,
    TX_VOTE_MEMO_SET,
    TX_VOTE_MODAL_HIDE,
    TX_VOTE_MODAL_SHOW,
    TX_VOTE_OPTION_SET,
    TX_VOTE_SUCCESS,
} from '../../constants/transactions';

const id = (state = {
    value: 0,
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_VOTE_ID_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_VOTE_SUCCESS:
    case TX_UNBOND_MODAL_HIDE:
        return {
            ...state,
            value: 0,
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const option = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case TX_VOTE_OPTION_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_VOTE_SUCCESS:
    case TX_UNBOND_MODAL_HIDE:
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
    case TX_VOTE_MEMO_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case TX_VOTE_SUCCESS:
    case TX_UNBOND_MODAL_HIDE:
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
    case TX_VOTE_IN_PROGRESS:
        return true;
    case TX_VOTE_ERROR:
    case TX_VOTE_SUCCESS:
        return false;
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case TX_VOTE_MODAL_SHOW:
        return true;
    case TX_VOTE_MODAL_HIDE:
    case TX_VOTE_ERROR:
    case TX_VOTE_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    id,
    option,
    memo,
    inProgress,
    modal,
});
