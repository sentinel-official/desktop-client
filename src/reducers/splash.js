import { SPLASH_STATUS_SET } from '../constants/splash';
import { combineReducers } from 'redux';

const completed = (state = 0, {
    type,
    data,
}) => {
    switch (type) {
    case SPLASH_STATUS_SET:
        return data.completed;
    default:
        return state;
    }
};

const message = (state = 'PREPARING THE SENTINEL CLIENT', {
    type,
    data,
}) => {
    switch (type) {
    case SPLASH_STATUS_SET:
        return data.message;
    default:
        return state;
    }
};

export default combineReducers({
    completed,
    message,
});
