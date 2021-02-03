import { combineReducers } from 'redux';
import { COINGECKO_GET_ERROR, COINGECKO_GET_IN_PROGRESS, COINGECKO_GET_SUCCESS } from '../constants/coingecko';

const rate = (state = 0, {
    type,
    data,
}) => {
    switch (type) {
    case COINGECKO_GET_SUCCESS:
        return data;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case COINGECKO_GET_IN_PROGRESS:
        return true;
    case COINGECKO_GET_SUCCESS:
    case COINGECKO_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    rate,
    inProgress,
});
