import { SPLASH_COMPLETED_SET } from '../constants/splash';
import { combineReducers } from 'redux';

const completed = (state = 0, {
    type,
    data,
}) => {
    switch (type) {
    case SPLASH_COMPLETED_SET:
        return data;
    default:
        return state;
    }
};

export default combineReducers({
    completed,
});
