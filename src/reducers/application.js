import { combineReducers } from 'redux';
import {
    APPLICATION_LOADING_ERROR,
    APPLICATION_LOADING_IN_PROGRESS,
    APPLICATION_LOADING_SUCCESS,
} from '../constants/application';

const isLoading = (state = false, action) => {
    switch (action.type) {
    case APPLICATION_LOADING_IN_PROGRESS:
        return true;
    case APPLICATION_LOADING_ERROR:
    case APPLICATION_LOADING_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    isLoading,
});
