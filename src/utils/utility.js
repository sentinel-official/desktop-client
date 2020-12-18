
/**
 @description
 * This file contains generic functions. 
 * They are here in utility because we are using them across the application.
 */

import { useHistory } from "react-router-dom";


const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

export const TOKEN_EXPIRY_MESSAGE = "Session has expired. Login again!"

export const API_URL = ''

export function actionCreator(actionType, data) {
    return {
        type: actionType,
        payload: data
    };
}

export function createRequestActionTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((requestTypes, type) => {
        requestTypes[type] = `${base}_${type}`;
        return requestTypes;
    }, {});
}

export function handleLoginRedirect(response, targetUrl) {
    localStorage.setItem("access_token", response.Token);
    useHistory.push(targetUrl);
}

export function handleLogoutRedirect() {
    localStorage.clear();
    window.location.pathname = '/login'
}

export const jsonApiHeader = accessToken => {
    return {
        "Content-Type": "application/json",
        "Authorization": accessToken ? `Bearer ${accessToken}` : ""
    };
};