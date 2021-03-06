import { managerBaseURL } from './common';

export const VALIDATORS_GET_IN_PROGRESS = 'VALIDATORS_GET_IN_PROGRESS';
export const VALIDATORS_GET_SUCCESS = 'VALIDATORS_GET_SUCCESS';
export const VALIDATORS_GET_ERROR = 'VALIDATORS_GET_ERROR';

export const validatorsGetURL = () => {
    const baseURL = managerBaseURL();
    return `${baseURL}/validators`;
};

export const VALIDATORS_FILTER_STATUS_SET = 'VALIDATORS_FILTER_STATUS_SET';

export const VALIDATORS_SET = 'VALIDATORS_SET';

export const VALIDATORS_SORT_SET = 'VALIDATORS_SORT_SET';
