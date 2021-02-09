import Async from 'async';
import { emptyFunc } from '../constants/common';
import {
    DELEGATIONS_GET_ERROR,
    DELEGATIONS_GET_IN_PROGRESS,
    DELEGATIONS_GET_SUCCESS,
    getDelegationsURL,
} from '../constants/delegations';
import Axios from '../services/axios';

export const getDelegationsInProgress = (data) => {
    return {
        type: DELEGATIONS_GET_IN_PROGRESS,
        data,
    };
};

export const getDelegationsSuccess = (data) => {
    return {
        type: DELEGATIONS_GET_SUCCESS,
        data,
    };
};

export const getDelegationsError = (data) => {
    return {
        type: DELEGATIONS_GET_ERROR,
        data,
    };
};

export const getDelegations = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getDelegationsInProgress(null));
            next(null);
        }, (next) => {
            const { keys } = getState();
            const url = getDelegationsURL(keys.items[keys.index].address);

            Axios.get(url)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getDelegationsError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getDelegationsSuccess(result));
            next(null);
        },
    ], cb);
};
