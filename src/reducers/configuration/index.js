import { combineReducers } from 'redux';
import {
    CONFIGURATION_GET_SUCCESS,
    CONFIGURATION_PUT_SUCCESS,
    CONFIGURATION_SETUP_SET,
} from '../../constants/configuration';
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

export default combineReducers({
    setup,
    chain,
    get,
    put,
});
