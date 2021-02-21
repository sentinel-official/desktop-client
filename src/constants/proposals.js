import { managerBaseURL } from './common';

export const PROPOSALS_GET_IN_PROGRESS = 'PROPOSALS_GET_IN_PROGRESS';
export const PROPOSALS_GET_SUCCESS = 'PROPOSALS_GET_SUCCESS';
export const PROPOSALS_GET_ERROR = 'PROPOSALS_GET_ERROR';

export const proposalsGetURL = () => {
    const baseURL = managerBaseURL();
    return `${baseURL}/accounts`;
};
