import { combineReducers } from 'redux';
import { KEYS_GET_ERROR, KEYS_GET_IN_PROGRESS, KEYS_GET_SUCCESS, KEYS_INDEX_SET } from '../../constants/keys';
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

const index = (state = 0, {
    type,
    data,
}) => {
    switch (type) {
    case KEYS_INDEX_SET:
        return data;
    default:
        return state;
    }
};

export default combineReducers({
    index,
    items,
    inProgress,
    post,
});
