
/**
 @desc
 * Centralized unique actions for Login Module.
 */

import {
    actionCreator,
    jsonApiHeader,
    LoginActionTypes,
    POST_LOGIN_API,
} from '../constants/index';
import { handleLoginRedirect, TOKEN_EXPIRY_MESSAGE } from '../../../utils/utility';


/**
 * @param  {[object]} postData [The data needed as a payload for the API interaction]
 */

export const LoginUserAction = (postData) => {
    return dispatch => {
        dispatch(actionCreator(LoginActionTypes.post_Login.REQUEST));
        // use axios here rather than fetch
        fetch(`${POST_LOGIN_API}`, {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: jsonApiHeader(),
        })
            .then(checkHttpStatus)
            .then(function (response) {
                // do some stuff here
            })
            .catch(function (error) {
                dispatch(actionCreator(LoginActionTypes.post_Login.FAILURE));
                console.log('error post_Login ..', error);
            });
    };
};





