import Async from 'async';
import Axios from 'axios';
import {
    ACCOUNT_GET_ERROR,
    ACCOUNT_GET_IN_PROGRESS,
    ACCOUNT_GET_SUCCESS,
    ACCOUNT_GET_URL,
} from '../constants/account';

export const getAccountInProgress = (data) => {
    return {
        type: ACCOUNT_GET_IN_PROGRESS,
        data,
    };
};

export const getAccountSuccess = (data) => {
    return {
        type: ACCOUNT_GET_SUCCESS,
        data,
    };
};

export const getAccountError = (data) => {
    return {
        type: ACCOUNT_GET_ERROR,
        data,
    };
};

export const getAccount = (cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getAccountInProgress(null));
            next(null);
        }, (next) => {
            const { authentication } = getState();

            Axios.get(ACCOUNT_GET_URL, {
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

                    dispatch(getAccountError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getAccountSuccess(result));
            next(null);
        },
    ], cb);
};
