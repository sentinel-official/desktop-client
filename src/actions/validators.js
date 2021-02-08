import Async from 'async';
import Axios from 'axios';
import Lodash from 'lodash';
import { emptyFunc } from '../constants/common';
import {
    VALIDATORS_ACTION_SET,
    VALIDATORS_AVATAR_URL_SET,
    VALIDATORS_FILTER_STATUS_SET,
    VALIDATORS_GET_ERROR,
    VALIDATORS_GET_IN_PROGRESS,
    VALIDATORS_GET_SUCCESS,
    VALIDATORS_GET_URL,
    VALIDATORS_SET,
} from '../constants/validators';

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
            const { authentication } = getState();

            Axios.get(VALIDATORS_GET_URL, {
                headers: {
                    Authorization: `Bearer ${authentication.info.value}`,
                },
            })
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
            result = Lodash.orderBy(result, ['amount.value'], ['desc']);
            result.forEach((item, index) => {
                item.index = index;
            });

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

export const setValidatorsActionSet = (data) => {
    return {
        type: VALIDATORS_ACTION_SET,
        data,
    };
};

export const setValidatorsAvatarURL = (data) => {
    return {
        type: VALIDATORS_AVATAR_URL_SET,
        data,
    };
};

export const sortValidators = (by, asc = true) => (dispatch, getState) => {
    const { items } = getState().validators;
    items.sort((X, Y) => {
        const x = Lodash.get(X, by);
        const y = Lodash.get(Y, by);

        return asc
            ? (x > y ? 1 : x < y ? -1 : 0)
            : (x < y ? 1 : x > y ? -1 : 0);
    });

    dispatch(setValidators(items));
};

export const setValidators = (data) => {
    return {
        type: VALIDATORS_SET,
        data,
    };
};
