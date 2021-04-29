import { HTTPSURLRegex } from '../constants/common';

export const capitalizeFirstLetter = (value) => {
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const addHTTPSURLScheme = (value) => {
    return HTTPSURLRegex.test(value) ? value : `https://${value}`;
};
