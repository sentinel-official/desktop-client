import { SNACKBAR_HIDE, SNACKBAR_SHOW } from '../constants/snackbar';

export const hideSnackbar = () => {
    return {
        type: SNACKBAR_HIDE,
    };
};

export const showSnackbar = (message) => {
    return {
        type: SNACKBAR_SHOW,
        message: message,
    };
};
