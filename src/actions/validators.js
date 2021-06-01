import {
    VALIDATORS_FILTER_STATUS_SET,
    VALIDATORS_GET_ERROR,
    VALIDATORS_GET_IN_PROGRESS,
    VALIDATORS_GET_SUCCESS,
    VALIDATORS_SORT_SET,
    validatorsGetURL,
} from '../constants/validators';
import { emptyFunc } from '../constants/common';
import { isActive } from '../utils/validator';
import Async from 'async';
import Axios from '../services/axios';
import Lodash from 'lodash';

export const getValidatorsInProgress = (data) => {
    return {
        type: VALIDATORS_GET_IN_PROGRESS,
        data,
    };
};

export const getValidatorsSuccess = (data) => {
    return {
        type: VALIDATORS_GET_SUCCESS,
        data,
    };
};

export const getValidatorsError = (data) => {
    return {
        type: VALIDATORS_GET_ERROR,
        data,
    };
};

export const getValidators = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getValidatorsInProgress(null));
            next(null);
        }, (next) => {
            const url = `${validatorsGetURL()}?limit=1000`;
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

                    dispatch(getValidatorsError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            result = Lodash.orderBy(result, ['tokens'], ['desc']);

            let activeIndex = 0;
            let inactiveIndex = 0;
            result.forEach((item) => {
                if (isActive(item)) {
                    item.index = activeIndex++;
                } else {
                    item.index = inactiveIndex++;
                }
            });

            result = Lodash.shuffle(result);
            dispatch(getValidatorsSuccess(result));
            next(null);
        },
    ], cb);
};

export const setValidatorsFilterStatus = (data) => {
    return {
        type: VALIDATORS_FILTER_STATUS_SET,
        data,
    };
};

export const setValidatorsSort = (data) => {
    return {
        type: VALIDATORS_SORT_SET,
        data,
    };
};
