import {
    AUTHENTICATION_INFO_CLEAR,
    AUTHENTICATION_INFO_SET,
    AUTHENTICATION_PASSWORD_SET,
    AUTHENTICATION_PASSWORD_VISIBLE_SET,
    AUTHENTICATION_POST_ERROR,
    AUTHENTICATION_POST_IN_PROGRESS,
    AUTHENTICATION_POST_SUBMIT,
    AUTHENTICATION_POST_SUCCESS,
} from '../constants/authentication';
import { combineReducers } from 'redux';

const password = (state = {
    value: '',
    error: {
        message: '',
    },
    visible: false,
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
    case AUTHENTICATION_PASSWORD_VISIBLE_SET:
        return {
            ...state,
            visible: data.visible,
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
            visible: false,
        };
    default:
        return state;
    }
};

const info = (state = {
    access: {
        value: '',
        expiry: '',
    },
    refresh: {
        value: '',
        expiry: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case AUTHENTICATION_POST_SUCCESS:
    case AUTHENTICATION_INFO_SET:
        return {
            ...state,
            access: {
                ...state.access,
                value: data.access.value,
                expiry: data.access.expiry,
            },
            refresh: {
                ...state.refresh,
                value: data.refresh.value,
                expiry: data.refresh.expiry,
            },
        };
    case AUTHENTICATION_INFO_CLEAR:
        return {
            ...state,
            access: {
                ...state.access,
                value: '',
                expiry: '',
            },
            refresh: {
                ...state.refresh,
                value: '',
                expiry: '',
            },
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

const submit = (state = false, {
    type,
}) => {
    switch (type) {
    case AUTHENTICATION_POST_SUBMIT:
        return true;
    case AUTHENTICATION_PASSWORD_SET:
    case AUTHENTICATION_POST_IN_PROGRESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    password,
    info,
    inProgress,
    submit,
});
