import {
    AUTH_PASSWORD_SET,
} from '../constants/account';

export const setPassword = (value) => {
    return {
        type: AUTH_PASSWORD_SET,
        value,
    };
};
