import {
    TX_VOTE_ERROR,
    TX_VOTE_ID_SET,
    TX_VOTE_IN_PROGRESS,
    TX_VOTE_MEMO_SET,
    TX_VOTE_MODAL_HIDE,
    TX_VOTE_MODAL_SHOW,
    TX_VOTE_OPTION_SET,
    TX_VOTE_SUCCESS,
    txVoteURL,
} from '../../constants/transactions';
import { emptyFunc } from '../../constants/common';
import Async from 'async';
import Axios from '../../services/axios';

export const setTxVoteID = (data) => {
    return {
        type: TX_VOTE_ID_SET,
        data,
    };
};

export const setTxVoteOption = (data) => {
    return {
        type: TX_VOTE_OPTION_SET,
        data,
    };
};

export const setTxVoteMemo = (data) => {
    return {
        type: TX_VOTE_MEMO_SET,
        data,
    };
};

export const txVoteInProgress = (data) => {
    return {
        type: TX_VOTE_IN_PROGRESS,
        data,
    };
};

export const txVoteSuccess = (data) => {
    return {
        type: TX_VOTE_SUCCESS,
        data,
    };
};

export const txVoteError = (data) => {
    return {
        type: TX_VOTE_ERROR,
        data,
    };
};

export const txVote = (cb = emptyFunc) => (dispatch, getState) => {
    Async.waterfall([
        (next) => {
            dispatch(txVoteInProgress());
            next(null);
        }, (next) => {
            const {
                account: { password },
                transactions: {
                    vote: {
                        id,
                        option,
                        memo,
                    },
                },
            } = getState();

            const url = txVoteURL(id.value);
            Axios.post(url, {
                option: option.value.trim(),
                memo: memo.value.trim(),
                password: password.value.trim(),
            })
                .then((res) => {
                    try {
                        next(null, res?.data?.result);
                    } catch (e) {
                        console.error(e);
                    }
                })
                .catch((error) => {
                    dispatch(txVoteError(error?.response?.data?.error || error));
                    next(error);
                });
        }, (result, next) => {
            dispatch(txVoteSuccess(result));
            next(null);
        },
    ], cb);
};

export const showTxVoteModal = (data) => {
    return {
        type: TX_VOTE_MODAL_SHOW,
        data,
    };
};

export const hideTxVoteModal = (data) => {
    return {
        type: TX_VOTE_MODAL_HIDE,
        data,
    };
};
