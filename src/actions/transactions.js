import Axios from 'axios';
import {
    OTHER_TRANSACTIONS_FETCH_ERROR,
    OTHER_TRANSACTIONS_FETCH_IN_PROGRESS,
    OTHER_TRANSACTIONS_FETCH_SUCCESS,
    RECEIVED_TRANSACTIONS_FETCH_ERROR,
    RECEIVED_TRANSACTIONS_FETCH_IN_PROGRESS,
    RECEIVED_TRANSACTIONS_FETCH_SUCCESS,
    SENT_TRANSACTIONS_FETCH_ERROR,
    SENT_TRANSACTIONS_FETCH_IN_PROGRESS,
    SENT_TRANSACTIONS_FETCH_SUCCESS,
    TRANSACTION_HASH_ERROR,
    TRANSACTION_HASH_IN_PROGRESS,
    TRANSACTION_HASH_INTERVAL_SET,
    TRANSACTION_HASH_SUCCESS,
    TRANSACTIONS_TAB_VALUE_SET,
} from '../constants/transactions';
import { fetchOtherTransactionsURL, fetchTransactionsURL, transactionHashURL } from '../constants/url';
import transactionErrorMsg from '../utils/errorMessage';

export const setTabValue = (value) => {
    return {
        type: TRANSACTIONS_TAB_VALUE_SET,
        value,
    };
};

const transactionHashInProgress = () => {
    return {
        type: TRANSACTION_HASH_IN_PROGRESS,
    };
};

const transactionHashSuccess = (message) => {
    return {
        type: TRANSACTION_HASH_SUCCESS,
        message,
    };
};

const transactionHashError = (error) => {
    return {
        type: TRANSACTION_HASH_ERROR,
        error,
    };
};

export const transactionHash = (hash) => (dispatch) => {
    dispatch(transactionHashInProgress());

    const url = transactionHashURL(hash);
    Axios.get(url)
        .then((res) => {
            if (res.data.result.result && res.data.result.result.result && res.data.result.result.result.log) {
                dispatch(transactionHashSuccess(transactionErrorMsg(res.data.result.result.result.log)));
            } else if (res.data.result.result) {
                dispatch(transactionHashSuccess('Success'));
            }
        })
        .catch((error) => {
            dispatch(transactionHashError(error.response && error.response.data && error.response.data.error));
        });
};

export const setIntervalValue = (value) => {
    return {
        type: TRANSACTION_HASH_INTERVAL_SET,
        value,
    };
};

export const fetchSentTransactionsInProgress = () => {
    return {
        type: SENT_TRANSACTIONS_FETCH_IN_PROGRESS,
    };
};

export const fetchSentTransactionsSuccess = (items) => {
    return {
        type: SENT_TRANSACTIONS_FETCH_SUCCESS,
        items,
    };
};

export const fetchSentTransactionsError = (error) => {
    return {
        type: SENT_TRANSACTIONS_FETCH_ERROR,
        error,
    };
};

export const fetchSentTransactions = (address) => (dispatch) => {
    dispatch(fetchSentTransactionsInProgress());

    const url = fetchTransactionsURL(address, 'send');
    Axios.get(url)
        .then((res) => {
            dispatch(fetchSentTransactionsSuccess(res.data.result.result));
        })
        .catch((error) => {
            dispatch(fetchSentTransactionsError(error.response && error.response.data && error.response.data.error));
        });
};

export const fetchReceivedTransactionsInProgress = () => {
    return {
        type: RECEIVED_TRANSACTIONS_FETCH_IN_PROGRESS,
    };
};

export const fetchReceivedTransactionsSuccess = (items) => {
    return {
        type: RECEIVED_TRANSACTIONS_FETCH_SUCCESS,
        items,
    };
};

export const fetchReceivedTransactionsError = (error) => {
    return {
        type: RECEIVED_TRANSACTIONS_FETCH_ERROR,
        error,
    };
};

export const fetchReceivedTransactions = (address) => (dispatch) => {
    dispatch(fetchReceivedTransactionsInProgress());

    const url = fetchTransactionsURL(address, 'receive');
    Axios.get(url)
        .then((res) => {
            dispatch(fetchReceivedTransactionsSuccess(res.data.result.result));
        })
        .catch((error) => {
            dispatch(fetchReceivedTransactionsError(error.response && error.response.data && error.response.data.error));
        });
};

export const fetchOtherTransactionsInProgress = () => {
    return {
        type: OTHER_TRANSACTIONS_FETCH_IN_PROGRESS,
    };
};

export const fetchOtherTransactionsSuccess = (items) => {
    return {
        type: OTHER_TRANSACTIONS_FETCH_SUCCESS,
        items,
    };
};

export const fetchOtherTransactionsError = (error) => {
    return {
        type: OTHER_TRANSACTIONS_FETCH_ERROR,
        error,
    };
};

export const fetchOtherTransactions = (address) => (dispatch) => {
    dispatch(fetchOtherTransactionsInProgress());

    const url = fetchOtherTransactionsURL(address);
    Axios.get(url)
        .then((res) => {
            dispatch(fetchOtherTransactionsSuccess(res.data.result.result));
        })
        .catch((error) => {
            dispatch(fetchOtherTransactionsError(error.response && error.response.data && error.response.data.error));
        });
};
