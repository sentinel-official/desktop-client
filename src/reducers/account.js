import { combineReducers } from 'redux';
import { AUTH_PASSWORD_SET } from '../constants/account';

const password = (state = '', action) => {
    switch (action.type) {
    case AUTH_PASSWORD_SET:
        return action.value;
    default:
        return state;
    }
};

export default combineReducers({
    password,
});