import { combineReducers } from 'redux';
import { ACTIVE_ACCOUNT_SET, KEYS_FETCH_ERROR, KEYS_FETCH_IN_PROGRESS, KEYS_FETCH_SUCCESS } from '../constants/keys';

const accounts = (state = {
    list: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case KEYS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case KEYS_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case KEYS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const activeAccount = (state = {}, action) => {
    switch (action.type) {
    case KEYS_FETCH_SUCCESS:
        return action.items.length > 0 ? action.items[0] : {};
    case ACTIVE_ACCOUNT_SET:
        return action.value;
    default:
        return state;
    }
};

export default combineReducers({
    accounts,
    activeAccount,
});
