import {
    PROPOSALS_GET_ERROR,
    PROPOSALS_GET_IN_PROGRESS,
    PROPOSALS_GET_SUCCESS,
    PROPOSALS_GET_URL,
} from '../constants/proposals';
import { emptyFunc } from '../constants/common';
import Async from 'async';
import Axios from '../services/axios';

export const getProposalsInProgress = (data) => {
    return {
        type: PROPOSALS_GET_IN_PROGRESS,
        data,
    };
};

export const getProposalsSuccess = (data) => {
    return {
        type: PROPOSALS_GET_SUCCESS,
        data,
    };
};

export const getProposalsError = (data) => {
    return {
        type: PROPOSALS_GET_ERROR,
        data,
    };
};

export const getProposals = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getProposalsInProgress(null));
            next(null);
        }, (next) => {
            Axios.get(PROPOSALS_GET_URL)
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    console.error(error);

                    dispatch(getProposalsError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getProposalsSuccess(result));
            next(null);
        },
    ], cb);
};
