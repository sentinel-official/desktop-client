import {
    CONFIGURATION_GET_SUCCESS,
    CONFIGURATION_MODAL_HIDE,
    CONFIGURATION_MODAL_SHOW,
    CONFIGURATION_PUT_SUCCESS,
    CONFIGURATION_SETUP_SET,
} from '../../constants/configuration';
import { combineReducers } from 'redux';
import chain from './chain';
import get from './get';
import put from './put';

const setup = (state = {
    value: false,
    error: {
        message: '',
    },
}, {
    data,
    type,
}) => {
    switch (type) {
    case CONFIGURATION_GET_SUCCESS:
    case CONFIGURATION_PUT_SUCCESS:
        return {
            value: data.setup,
            error: {
                message: '',
            },
        };
    case CONFIGURATION_SETUP_SET:
        return {
            value: data.value,
            error: {
                message: data.error.message,
            },
        };
    default:
        return state;
    }
};

const modal = (state = false, {
    type,
}) => {
    switch (type) {
    case CONFIGURATION_MODAL_SHOW:
        return true;
    case CONFIGURATION_PUT_SUCCESS:
    case CONFIGURATION_MODAL_HIDE:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    setup,
    modal,
    chain,
    get,
    put,
});
