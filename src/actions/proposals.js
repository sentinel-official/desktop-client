import Async from 'async';
import Axios from 'axios';
import {
    PROPOSALS_GET_ERROR,
    PROPOSALS_GET_IN_PROGRESS,
    PROPOSALS_GET_SUCCESS,
    PROPOSALS_GET_URL,
} from '../constants/proposals';

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

export const getProposals = (cb) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(getProposalsInProgress(null));
            next(null);
        }, (next) => {
            const { authentication } = getState();

            Axios.get(PROPOSALS_GET_URL, {
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

                    dispatch(getProposalsError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(getProposalsSuccess(result));
            next(null);
        },
    ], cb);
};
