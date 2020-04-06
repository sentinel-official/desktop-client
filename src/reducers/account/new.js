import { combineReducers } from 'redux';
import {
    ACCOUNT_CREATION_STEP_SET,
    ACCOUNT_CREATION_TAB_VALUE_SET,
    ACCOUNT_NAME_SET,
    CONTINUE_BUTTON_SHOW,
    MISSING_SEED_INDEX,
    PASSWORD_SET,
    SEED_VALUES_SET,
} from '../../constants/account';
import { KEYS_ADD_ERROR, KEYS_ADD_IN_PROGRESS, KEYS_ADD_SUCCESS, LOCAL_STORAGE_SEED_SET } from '../../constants/keys';

const step = (state = 1, action) => {
    if (action.type === ACCOUNT_CREATION_STEP_SET) {
        return action.value;
    }

    return state;
};

const name = (state = '', action) => {
    switch (action.type) {
    case ACCOUNT_NAME_SET:
        return action.value;
    case KEYS_ADD_SUCCESS:
        return '';
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case PASSWORD_SET:
        return action.value;
    case KEYS_ADD_SUCCESS:
        return '';
    default:
        return state;
    }
};

const inProgress = (state = false, action) => {
    switch (action.type) {
    case KEYS_ADD_IN_PROGRESS:
        return true;
    case KEYS_ADD_SUCCESS:
    case KEYS_ADD_ERROR:
        return false;
    default:
        return state;
    }
};

const pubKey = (state = '', action) => {
    switch (action.type) {
    case KEYS_ADD_SUCCESS:
        return action.items && action.items.pub_key;
    case LOCAL_STORAGE_SEED_SET:
        return action.value && action.value.pub_key;
    default:
        return state;
    }
};

const address = (state = '', action) => {
    switch (action.type) {
    case KEYS_ADD_SUCCESS:
        return action.items && action.items.address;
    case LOCAL_STORAGE_SEED_SET:
        return action.value && action.value.address;
    default:
        return state;
    }
};

const mnemonic = (state = '', action) => {
    switch (action.type) {
    case KEYS_ADD_SUCCESS:
        return action.items && action.items.mnemonic;
    case LOCAL_STORAGE_SEED_SET:
        return action.value && action.value.mnemonic;
    default:
        return state;
    }
};

const missingSeedIndex = (state = [], action) => {
    if (action.type === MISSING_SEED_INDEX) {
        return action.value;
    }

    return state;
};

const seedValues = (state = {}, action) => {
    if (action.type === SEED_VALUES_SET) {
        return action.value;
    }

    return state;
};

const enable = (state = false, action) => {
    if (action.type === CONTINUE_BUTTON_SHOW) {
        return action.value;
    }

    return state;
};

const tabValue = (state = 0, action) => {
    if (action.type === ACCOUNT_CREATION_TAB_VALUE_SET) {
        return action.value;
    }

    return state;
};

export default combineReducers({
    step,
    name,
    password,
    inProgress,
    missingSeedIndex,
    seedValues,
    enable,
    tabValue,
    pubKey,
    address,
    mnemonic,
});
