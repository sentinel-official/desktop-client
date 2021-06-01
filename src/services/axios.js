import Axios from 'axios';

const axios = Axios.create({});

export const withInterceptors = (token) => {
    axios.interceptors.request.use((config) => {
        config.headers = {
            Authorization: token,
        };

        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};

export default axios;
