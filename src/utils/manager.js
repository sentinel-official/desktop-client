import { managerBaseURL } from '../constants/common';
import Async from 'async';
import Axios from 'axios';

export const isManagerRunning = (cb) => {
    Async.retry({
        times: 5,
        interval: (count) => {
            return count * 1000;
        },
    }, (next) => {
        const url = managerBaseURL();
        Axios.get(url)
            .then(() => {
                next(null);
            })
            .catch((err) => {
                if (err.response?.status === 404) {
                    next(null);
                } else {
                    next(err);
                }
            });
    }, cb);
};
