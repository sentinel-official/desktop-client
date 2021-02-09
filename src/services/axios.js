import Axios from 'axios';
import { clearAuthenticationInfo, setAuthenticationInfo } from '../actions/authentication';
import { AUTHENTICATION_POST_URL } from '../constants/authentication';

const axios = Axios.create({});

export const withInterceptors = (axios, store) => {
    const {
        dispatch,
        getState,
    } = store;

    axios.interceptors.request.use((config) => {
        const { authentication } = getState();

        config.headers = {
            Authorization: `Bearer ${authentication.info.access.value}`,
        };

        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((res) => {
        return res;
    }, (error) => {
        const {
            config,
            response,
        } = error;

        if (response.status === 401 && config.url === AUTHENTICATION_POST_URL) {
            dispatch(clearAuthenticationInfo());
            return Promise.reject(error);
        }

        if (response.status === 401 && !config._retry) {
            config._retry = true;

            const { authentication } = getState();
            return axios.post(AUTHENTICATION_POST_URL, {
                token: authentication.info.refresh.value,
            })
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setAuthenticationInfo(res.data.result));
                        return axios(config);
                    }
                });
        }

        return Promise.reject(error);
    });
};

export default axios;
