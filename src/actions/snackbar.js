import { SNACKBAR_HIDE, SNACKBAR_SHOW } from '../constants/snackbar';

export const hideSnackbar = (data) => {
    return {
        type: SNACKBAR_HIDE,
        data,
    };
};

export const showSnackbar = (data) => {
    return {
        type: SNACKBAR_SHOW,
        data,
    };
};
