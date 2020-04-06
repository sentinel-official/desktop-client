import { combineReducers } from 'redux';
import { KEYS_ADD_SUCCESS } from '../../constants/keys';
import { NEW_ACCOUNT_NAME_SET, NEW_ACCOUNT_PASSWORD_SET, SEED_SET } from '../../constants/navbar';

const name = (state = '', action) => {
    switch (action.type) {
    case NEW_ACCOUNT_NAME_SET:
        return action.value;
    case KEYS_ADD_SUCCESS:
        return '';
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case NEW_ACCOUNT_PASSWORD_SET:
        return action.value;
    case KEYS_ADD_SUCCESS:
        return '';
    default:
        return state;
    }
};

const seed = (state = '', action) => {
    switch (action.type) {
    case SEED_SET:
        return action.value;
    case KEYS_ADD_SUCCESS:
        return '';
    default:
        return state;
    }
};

export default combineReducers({
    name,
    password,
    seed,
});
