/**
 @desc
 * Centralized unique action types for Login actions and reducers.
 */


import {
    actionCreator,
    API_URL,
    createRequestActionTypes,
    jsonApiHeader,
} from '../../../utils/utility';

export {
    jsonApiHeader,
    actionCreator,
};

export const POST_LOGIN_API = `${API_URL}/api/v1/login`;

export const LoginActionTypes = {
    post_Login: createRequestActionTypes('POST_LOGIN'),
};