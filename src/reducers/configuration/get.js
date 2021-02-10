import {
    CONFIGURATION_GET_ERROR,
    CONFIGURATION_GET_IN_PROGRESS,
    CONFIGURATION_GET_SUCCESS,
} from '../../constants/configuration';
import { combineReducers } from 'redux';

const inProgress = (state = false, { type }) => {
    switch (type) {
    case CONFIGURATION_GET_IN_PROGRESS:
        return true;
    case CONFIGURATION_GET_ERROR:
    case CONFIGURATION_GET_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    inProgress,
});
