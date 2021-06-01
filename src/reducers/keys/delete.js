import {
    KEYS_DELETE_ERROR,
    KEYS_DELETE_IN_PROGRESS,
    KEYS_DELETE_NAME_SET,
    KEYS_DELETE_SUCCESS,
    KEYS_LIST_MODAL_HIDE,
} from '../../constants/keys';
import { combineReducers } from 'redux';

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
    inProgress,
    name,
});
