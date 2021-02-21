import {
    CONFIGURATION_PUT_ERROR,
    CONFIGURATION_PUT_IN_PROGRESS,
    CONFIGURATION_PUT_SUCCESS,
} from '../../constants/configuration';
import { combineReducers } from 'redux';

const inProgress = (state = false, { type }) => {
    switch (type) {
    case CONFIGURATION_PUT_IN_PROGRESS:
        return true;
    case CONFIGURATION_PUT_ERROR:
    case CONFIGURATION_PUT_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    inProgress,
});
