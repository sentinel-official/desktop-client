import { DELEGATIONS_GET_ERROR, DELEGATIONS_GET_IN_PROGRESS, DELEGATIONS_GET_SUCCESS } from '../constants/delegations';
import { combineReducers } from 'redux';

const items = (state = [], {
    type,
    data,
}) => {
    switch (type) {
    case DELEGATIONS_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case DELEGATIONS_GET_IN_PROGRESS:
        return true;
    case DELEGATIONS_GET_SUCCESS:
    case DELEGATIONS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
