import { combineReducers } from 'redux';
import { PROPOSALS_GET_ERROR, PROPOSALS_GET_IN_PROGRESS, PROPOSALS_GET_SUCCESS } from '../constants/proposals';

const items = (state = [], {
    type,
    data,
}) => {
    switch (type) {
    case PROPOSALS_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case PROPOSALS_GET_IN_PROGRESS:
        return true;
    case PROPOSALS_GET_SUCCESS:
    case PROPOSALS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    items,
    inProgress,
});
