import { combineReducers } from 'redux';
import { WITHDRAW_ALL_ERROR, WITHDRAW_ERROR } from '../constants/distribution';
import { KEYS_ADD_ERROR, KEYS_DELETE_ERROR, KEYS_DELETE_SUCCESS, KEYS_FETCH_ERROR } from '../constants/keys';
import { FAUCET_TRANSFER_FETCH_ERROR, FAUCET_TRANSFER_FETCH_SUCCESS } from '../constants/navbar';
import { SNACKBAR_HIDE, SNACKBAR_SHOW } from '../constants/snackbar';
import {
    ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
    DELEGATION_ERROR,
    DELEGATIONS_VALIDATORS_LIST_FETCH_ERROR,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
    OUT_OF_GAS,
    RE_DELEGATE_ERROR,
    UN_BOND_ERROR,
    VALIDATORS_LIST_FETCH_ERROR,
} from '../constants/staking';
import {
    OTHER_TRANSACTIONS_FETCH_ERROR,
    RECEIVED_TRANSACTIONS_FETCH_ERROR,
    SENT_TRANSACTIONS_FETCH_ERROR,
    TRANSACTION_HASH_ERROR,
    TRANSACTION_HASH_SUCCESS,
} from '../constants/transactions';
import { TRANSFER_TOKENS_ERROR, TRANSFER_TOKENS_SUCCESS, WALLET_DETAILS_GET_ERROR } from '../constants/wallet';

const snackbar = (state = {
    open: false,
    message: '',
}, action) => {
    switch (action.type) {
    case TRANSFER_TOKENS_SUCCESS:
    case KEYS_DELETE_SUCCESS:
    case TRANSACTION_HASH_SUCCESS:
    case FAUCET_TRANSFER_FETCH_SUCCESS:
    case OUT_OF_GAS:
    case SNACKBAR_SHOW:
        return {
            open: true,
            message: action.message,
        };
    case SNACKBAR_HIDE:
        return {
            open: false,
            message: '',
        };
    default:
        return state;
    }
};

const error = (state = {
    module: '',
    code: 0,
}, action) => {
    switch (action.type) {
    case WALLET_DETAILS_GET_ERROR:
    case DELEGATION_ERROR:
    case WITHDRAW_ALL_ERROR:
    case WITHDRAW_ERROR:
    case KEYS_FETCH_ERROR:
    case KEYS_ADD_ERROR:
    case KEYS_DELETE_ERROR:
    case FAUCET_TRANSFER_FETCH_ERROR:
    case RE_DELEGATE_ERROR:
    case VALIDATORS_LIST_FETCH_ERROR:
    case DELEGATIONS_VALIDATORS_LIST_FETCH_ERROR:
    case ACTIVE_VALIDATORS_LIST_FETCH_ERROR:
    case IN_ACTIVE_VALIDATORS_LIST_FETCH_ERROR:
    case TRANSACTION_HASH_ERROR:
    case SENT_TRANSACTIONS_FETCH_ERROR:
    case RECEIVED_TRANSACTIONS_FETCH_ERROR:
    case OTHER_TRANSACTIONS_FETCH_ERROR:
    case UN_BOND_ERROR:
    case TRANSFER_TOKENS_ERROR:
        return {
            module: (action.error && action.error.module) || '',
            code: (action.error && action.error.code) || '',
        };
    case SNACKBAR_HIDE:
        return {
            module: '',
            code: 0,
        };
    default:
        return state;
    }
};

export default combineReducers({
    snackbar,
    error,
});
