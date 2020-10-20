import {
    APPLICATION_LOADING_ERROR,
    APPLICATION_LOADING_IN_PROGRESS,
    APPLICATION_LOADING_SUCCESS,
    AUTH_PASSWORD_SET,
} from '../constants/application';

export const loadingError = () => {
    return {
        type: APPLICATION_LOADING_ERROR,
    };
};

export const loadingInProgress = () => {
    return {
        type: APPLICATION_LOADING_IN_PROGRESS,
    };
};

export const loadingSuccess = () => {
    return {
        type: APPLICATION_LOADING_SUCCESS,
    };
};

export const load = () => (dispatch) => {
    dispatch(loadingInProgress());

    try {
        const loader = document.querySelector('.loader-container');
        if (loader) {
            loader.remove();
        }
    } catch (e) {
        console.error(e);
        dispatch(loadingError());
    }

    dispatch(loadingSuccess());
};

export const setPassword = (value) => {
    return {
        type: AUTH_PASSWORD_SET,
        value,
    };
};
