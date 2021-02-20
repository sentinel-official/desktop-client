import { authenticationPostURL } from '../constants/authentication';
import { clearAuthenticationInfo, setAuthenticationInfo } from '../actions/authentication';
import Axios from 'axios';

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

        const url = authenticationPostURL();
        if (response.status === 401 && config.url === url) {
            dispatch(clearAuthenticationInfo());
            return Promise.reject(error);
        }

        if (response.status === 401 && !config._retry) {
            config._retry = true;

            const { authentication } = getState();
            return axios.post(url, {
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
