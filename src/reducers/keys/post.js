import {
    KEYS_POST_ERROR,
    KEYS_POST_IN_PROGRESS,
    KEYS_POST_SUCCESS,
    KEY_MNEMONIC_SET,
    KEY_NAME_SET,
    KEY_PASSWORD_SET,
} from '../../constants/keys';
import { combineReducers } from 'redux';

const name = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case KEY_NAME_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYS_POST_SUCCESS:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const password = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case KEY_PASSWORD_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYS_POST_SUCCESS:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const mnemonic = (state = {
    value: '',
    error: {
        message: '',
    },
}, {
    type,
    data,
}) => {
    switch (type) {
    case KEY_MNEMONIC_SET:
        return {
            ...state,
            value: data.value,
            error: {
                ...state.error,
                message: data.error.message,
            },
        };
    case KEYS_POST_SUCCESS:
        return {
            ...state,
            value: '',
            error: {
                ...state.error,
                message: '',
            },
        };
    default:
        return state;
    }
};

const info = (state = {
    address: '',
    publicKey: '',
    mnemonic: '',
    name: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case KEYS_POST_SUCCESS:
        return {
            ...state,
            address: data.address,
            publicKey: data['pub_key'],
            mnemonic: data.mnemonic,
            name: data.name,
        };
    default:
        return state;
    }
};

const inProgress = (state = false, { type }) => {
    switch (type) {
    case KEYS_POST_IN_PROGRESS:
        return true;
    case KEYS_POST_ERROR:
    case KEYS_POST_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    name,
    password,
    mnemonic,
    inProgress,
    info,
});
