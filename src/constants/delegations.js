import { managerBaseURL } from './common';

export const DELEGATIONS_GET_IN_PROGRESS = 'DELEGATIONS_GET_IN_PROGRESS';
export const DELEGATIONS_GET_SUCCESS = 'DELEGATIONS_GET_SUCCESS';
export const DELEGATIONS_GET_ERROR = 'DELEGATIONS_GET_ERROR';

export const delegationsGetURL = (address) => {
    const baseURL = managerBaseURL();
    return `${baseURL}/delegators/${address}/delegations`;
};
