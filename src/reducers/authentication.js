import { combineReducers } from 'redux';
import {
    AUTHENTICATION_PASSWORD_SET,
    AUTHENTICATION_POST_ERROR,
    AUTHENTICATION_POST_IN_PROGRESS,
    AUTHENTICATION_POST_SUCCESS,
} from '../constants/authentication';

const password = (state = {
    value: 'admin',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case AUTHENTICATION_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case AUTHENTICATION_POST_ERROR:
    case AUTHENTICATION_POST_SUCCESS:
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

const info = (state = {
    value: '',
    expiry: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case AUTHENTICATION_POST_SUCCESS:
        return {
            ...state,
            value: data.value,
            expiry: data.expiry,
        };
    default:
        return state;
    }
};

const inProgress = (state = false, { type }) => {
    switch (type) {
    case AUTHENTICATION_POST_IN_PROGRESS:
        return true;
    case AUTHENTICATION_POST_ERROR:
    case AUTHENTICATION_POST_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    password,
    info,
    inProgress,
});
