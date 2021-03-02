import {
    KEYS_CREATE_MODAL_HIDE,
    KEYS_CREATE_MODAL_SHOW,
    KEYS_DELETE_ERROR,
    KEYS_DELETE_IN_PROGRESS,
    KEYS_DELETE_NAME_SET,
    KEYS_DELETE_PASSWORD_SET,
    KEYS_DELETE_PASSWORD_VISIBLE_SET,
    KEYS_DELETE_SUCCESS,
    KEYS_LIST_MODAL_HIDE,
} from '../../constants/keys';
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
    case KEYS_DELETE_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYS_DELETE_PASSWORD_VISIBLE_SET:
        return {
            ...state,
            visible: data.visible,
        };
    case KEYS_DELETE_ERROR:
    case KEYS_DELETE_SUCCESS:
    case KEYS_CREATE_MODAL_HIDE:
    case KEYS_CREATE_MODAL_SHOW:
    case KEYS_DELETE_NAME_SET:
        return {
            value: '',
            error: {
                message: '',
            },
            visible: false,
        };
    default:
        return state;
    }
};

const inProgress = (state = false, { type }) => {
    switch (type) {
    case KEYS_DELETE_IN_PROGRESS:
        return true;
    case KEYS_DELETE_ERROR:
    case KEYS_DELETE_SUCCESS:
        return false;
    default:
        return state;
    }
};

const name = (state = '', {
    type,
    data,
}) => {
    switch (type) {
    case KEYS_DELETE_NAME_SET:
        return data;
    case KEYS_LIST_MODAL_HIDE:
        return '';
    default:
        return state;
    }
};

export default combineReducers({
    password,
    inProgress,
    name,
});
