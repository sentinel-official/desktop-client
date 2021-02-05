import { combineReducers } from 'redux';
import { VALIDATORS_GET_ERROR, VALIDATORS_GET_IN_PROGRESS, VALIDATORS_GET_SUCCESS } from '../constants/validators';

const items = (state = [], {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case VALIDATORS_GET_IN_PROGRESS:
        return true;
    case VALIDATORS_GET_SUCCESS:
    case VALIDATORS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
