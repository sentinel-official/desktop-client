import {
    KEYS_CREATE_MODAL_SHOW,
    KEYS_GET_ERROR,
    KEYS_GET_IN_PROGRESS,
    KEYS_GET_SUCCESS,
    KEYS_LIST_MODAL_HIDE,
    KEYS_LIST_MODAL_SHOW,
    KEYS_NAME_SET,
} from '../../constants/keys';
import { combineReducers } from 'redux';
import _delete from './delete';
import post from './post';

const items = (state = [], {
    type,
    data,
}) => {
    switch (type) {
    case KEYS_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, { type }) => {
    switch (type) {
    case KEYS_GET_IN_PROGRESS:
        return true;
    case KEYS_GET_ERROR:
    case KEYS_GET_SUCCESS:
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
    case KEYS_NAME_SET:
        return data;
    case KEYS_GET_SUCCESS: {
        if (state === '' && data.length > 0) {
            return data[0].name;
        }

        return state;
    }
    default:
        return state;
    }
};

const show = (state = false, {
    type,
}) => {
    switch (type) {
    case KEYS_LIST_MODAL_SHOW:
        return true;
    case KEYS_LIST_MODAL_HIDE:
    case KEYS_CREATE_MODAL_SHOW:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    name,
    items,
    inProgress,
    post,
    show,
    delete: _delete,
});
