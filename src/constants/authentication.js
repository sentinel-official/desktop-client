import { API_BASE_URL } from './common';

export const AUTHENTICATION_PASSWORD_SET = 'AUTHENTICATION_PASSWORD_SET';

export const AUTHENTICATION_POST_IN_PROGRESS = 'AUTHENTICATION_POST_IN_PROGRESS';
export const AUTHENTICATION_POST_SUCCESS = 'AUTHENTICATION_POST_SUCCESS';
export const AUTHENTICATION_POST_ERROR = 'AUTHENTICATION_POST_ERROR';

export const AUTHENTICATION_POST_URL = `${API_BASE_URL}/login`;