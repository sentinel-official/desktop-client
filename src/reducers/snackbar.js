import { CONFIGURATION_GET_ERROR, CONFIGURATION_PUT_ERROR } from '../constants/configuration';
import { KEYS_DELETE_ERROR, KEYS_GET_ERROR, KEYS_POST_ERROR } from '../constants/keys';
import { SNACKBAR_HIDE, SNACKBAR_SHOW } from '../constants/snackbar';
import { capitalizeFirstLetter } from '../utils/string';

const _ = (state = {
    open: false,
    message: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case SNACKBAR_SHOW:
    case CONFIGURATION_GET_ERROR:
    case CONFIGURATION_PUT_ERROR:
    case KEYS_GET_ERROR:
    case KEYS_POST_ERROR:
    case KEYS_DELETE_ERROR:
        return {
            ...state,
            open: true,
            message: capitalizeFirstLetter(data.message),
        };
    case SNACKBAR_HIDE:
        return {
            ...state,
            open: false,
            message: '',
        };
    default:
        return state;
    }
};

export default _;
