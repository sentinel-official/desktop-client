import { combineReducers } from 'redux';
import { WITHDRAW_ALL_SUCCESS, WITHDRAW_SUCCESS } from '../constants/distribution';
import { FAUCET_TRANSFER_FETCH_SUCCESS } from '../constants/navbar';
import {
    DELEGATION_SUCCESS,
    DELEGATIONS_VALIDATORS_LIST_FETCH_SUCCESS,
    RE_DELEGATE_SUCCESS,
    UN_BOND_SUCCESS,
} from '../constants/staking';
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
    TRANSACTION_HASH_INTERVAL_SET,
    TRANSACTION_HASH_SUCCESS,
    TRANSACTIONS_TAB_VALUE_SET,
} from '../constants/transactions';
import { TRANSFER_TOKENS_SUCCESS, WALLET_DETAILS_GET_SUCCESS } from '../constants/wallet';

const tabValue = (state = 0, action) => {
    if (action.type === TRANSACTIONS_TAB_VALUE_SET) {
        return action.value;
    }

    return state;
};

const sentTransactions = (state = {
    list: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case SENT_TRANSACTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case SENT_TRANSACTIONS_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case SENT_TRANSACTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const receivedTransactions = (state = {
    list: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case RECEIVED_TRANSACTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case RECEIVED_TRANSACTIONS_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case RECEIVED_TRANSACTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const otherTransactions = (state = {
    list: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case OTHER_TRANSACTIONS_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case OTHER_TRANSACTIONS_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case OTHER_TRANSACTIONS_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const hash = (state = '', action) => {
    if (action.type === TRANSFER_TOKENS_SUCCESS) {
        return action.hash;
    }

    return state;
};

const setIntervalValue = (state = 0, action) => {
    if (action.type === TRANSACTION_HASH_INTERVAL_SET) {
        return action.value;
    }

    return state;
};

const startSetInterval = (state = false, action) => {
    switch (action.type) {
    case TRANSFER_TOKENS_SUCCESS:
    case RE_DELEGATE_SUCCESS:
    case WITHDRAW_SUCCESS:
    case DELEGATION_SUCCESS:
    case FAUCET_TRANSFER_FETCH_SUCCESS:
    case UN_BOND_SUCCESS:
    case WITHDRAW_ALL_SUCCESS:
        return true;
    case TRANSACTION_HASH_INTERVAL_SET:
        return false;
    default:
        return state;
    }
};

const success = (state = false, action) => {
    switch (action.type) {
    case TRANSACTION_HASH_INTERVAL_SET:
    case WALLET_DETAILS_GET_SUCCESS:
    case DELEGATIONS_VALIDATORS_LIST_FETCH_SUCCESS:
        return false;
    case TRANSACTION_HASH_SUCCESS:
        return true;
    default:
        return state;
    }
};

const sentTransactionFetch = (state = false, action) => {
    switch (action.type) {
    case TRANSFER_TOKENS_SUCCESS:
        return true;
    case WALLET_DETAILS_GET_SUCCESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    tabValue,
    hash,
    setIntervalValue,
    success,
    startSetInterval,
    sentTransactions,
    receivedTransactions,
    otherTransactions,
    sentTransactionFetch,
});
