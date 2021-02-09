import { API_BASE_URL } from './common';

export const DELEGATIONS_GET_IN_PROGRESS = 'DELEGATIONS_GET_IN_PROGRESS';
export const DELEGATIONS_GET_SUCCESS = 'DELEGATIONS_GET_SUCCESS';
export const DELEGATIONS_GET_ERROR = 'DELEGATIONS_GET_ERROR';

export const DELEGATIONS_GET_URL = `${API_BASE_URL}/accounts`;

export const getDelegationsURL = (address) => {
    return `${API_BASE_URL}/delegators/${address}/delegations`;
};
