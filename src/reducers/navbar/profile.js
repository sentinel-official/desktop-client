import { combineReducers } from 'redux';
import {
    ACTIVE_ACCOUNT_SET,
    KEYS_DELETE_ERROR,
    KEYS_DELETE_IN_PROGRESS,
    KEYS_DELETE_SUCCESS,
} from '../../constants/keys';
import {
    DELETE_ACCOUNT_DIALOG_HIDE,
    DELETE_ACCOUNT_DIALOG_SHOW,
    DELETE_ACCOUNT_PASSWORD_SET,
    PROFILE_POPOVER_HIDE,
    PROFILE_POPOVER_SHOW,
} from '../../constants/navbar';

const popOver = (state = null, action) => {
    switch (action.type) {
    case PROFILE_POPOVER_SHOW:
        return action.value;
    case PROFILE_POPOVER_HIDE:
    case ACTIVE_ACCOUNT_SET:
        return null;
    default:
        return state;
    }
};

const dialog = (state = false, action) => {
    switch (action.type) {
    case DELETE_ACCOUNT_DIALOG_SHOW:
        return true;
    case DELETE_ACCOUNT_DIALOG_HIDE:
    case KEYS_DELETE_SUCCESS:
        return false;
    default:
        return state;
    }
};

const accountName = (state = '', action) => {
    switch (action.type) {
    case DELETE_ACCOUNT_DIALOG_SHOW:
        return action.value;
    case KEYS_DELETE_SUCCESS:
    case DELETE_ACCOUNT_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const password = (state = '', action) => {
    switch (action.type) {
    case DELETE_ACCOUNT_PASSWORD_SET:
        return action.value;
    case KEYS_DELETE_SUCCESS:
    case DELETE_ACCOUNT_DIALOG_HIDE:
        return '';
    default:
        return state;
    }
};

const deleteInProgress = (state = false, action) => {
    switch (action.type) {
    case KEYS_DELETE_IN_PROGRESS:
        return true;
    case KEYS_DELETE_SUCCESS:
    case KEYS_DELETE_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    popOver,
    dialog,
    accountName,
    password,
    deleteInProgress,
});
