import {
    DELEGATIONS_GET_ERROR,
    DELEGATIONS_GET_IN_PROGRESS,
    DELEGATIONS_GET_SUCCESS,
    delegationsGetURL,
} from '../constants/delegations';
import { emptyFunc } from '../constants/common';
import Async from 'async';
import Axios from 'axios';
import Lodash from 'lodash';

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
            const {
                keys: {
                    items,
                    name,
                },
            } = getState();

            const item = Lodash.find(items, ['name', name]);
            const url = delegationsGetURL(item.address);
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
