import { combineReducers } from 'redux';
import { WITHDRAW_ALL_SUCCESS, WITHDRAW_SUCCESS, WITHDRAW_SUCCESS_DIALOG_SHOW } from '../../constants/distribution';
import { ACTIVE_ACCOUNT_SET } from '../../constants/keys';
import {
    ACTIVE_BUTTON_SWITCH_SET,
    DELEGATE_DIALOG_HIDE,
    DELEGATE_DIALOG_SHOW,
    DELEGATE_SUCCESS_DIALOG_SHOW,
    DELEGATION_SUCCESS,
    DELEGATIONS_VALIDATORS_LIST_FETCH_ERROR,
    DELEGATIONS_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    DELEGATIONS_VALIDATORS_LIST_FETCH_SUCCESS,
    RE_DELEGATE_DIALOG_HIDE,
    RE_DELEGATE_DIALOG_SHOW,
    RE_DELEGATE_SUCCESS,
    RE_DELEGATE_SUCCESS_DIALOG_SHOW,
    STACKING_TAB_VALUE_SET,
    UN_BOND_DIALOG_HIDE,
    UN_BOND_DIALOG_SHOW,
    UN_BOND_SUCCESS,
    UN_BOND_SUCCESS_DIALOG_SHOW,
    VALIDATORS_LIST_FETCH_ERROR,
    VALIDATORS_LIST_FETCH_IN_PROGRESS,
    VALIDATORS_LIST_FETCH_SET,
    VALIDATORS_LIST_FETCH_SUCCESS,
} from '../../constants/staking';
import { TRANSACTION_HASH_SUCCESS } from '../../constants/transactions';
import { header } from '../../dummy/validatorsList';
import delegate from './delegate';
import reDelegate from './reDelegate';
import unBond from './unBond';

const tabValue = (state = 0, action) => {
    if (action.type === STACKING_TAB_VALUE_SET) {
        return action.value;
    }

    return state;
};

const tableHeader = (state = header) => {
    return state;
};

const validatorsList = (state = {
    list: [],
    inProgress: false,
    fetch: false,
}, action) => {
    switch (action.type) {
    case VALIDATORS_LIST_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
            fetch: false,
        };
    case VALIDATORS_LIST_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case VALIDATORS_LIST_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    case TRANSACTION_HASH_SUCCESS:
    case ACTIVE_ACCOUNT_SET:
        return {
            ...state,
            fetch: true,
        };
    default:
        return state;
    }
};

const rowData = (state = {}, action) => {
    switch (action.type) {
    case DELEGATE_DIALOG_SHOW:
    case RE_DELEGATE_DIALOG_SHOW:
    case UN_BOND_DIALOG_SHOW:
        return action.value;
    case DELEGATE_DIALOG_HIDE:
    case RE_DELEGATE_DIALOG_HIDE:
    case UN_BOND_DIALOG_HIDE:
        return {};
    default:
        return state;
    }
};

export const hash = (state = '', action) => {
    switch (action.type) {
    case RE_DELEGATE_SUCCESS:
    case DELEGATION_SUCCESS:
    case WITHDRAW_ALL_SUCCESS:
    case UN_BOND_SUCCESS:
    case WITHDRAW_SUCCESS:
        return action.value;
    default:
        return state;
    }
};

export const delegationsValidators = (state = {
    list: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case DELEGATIONS_VALIDATORS_LIST_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case DELEGATIONS_VALIDATORS_LIST_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case DELEGATIONS_VALIDATORS_LIST_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export const buttonSwitch = (state = false, action) => {
    if (action.type === ACTIVE_BUTTON_SWITCH_SET) {
        return action.value;
    }

    return state;
};

export const validatorListFetch = (state = false, action) => {
    switch (action.type) {
    case TRANSACTION_HASH_SUCCESS:
        return true;
    case VALIDATORS_LIST_FETCH_SET:
        return false;
    default:
        return state;
    }
};

export const delegatorListFetch = (state = false, action) => {
    switch (action.type) {
    case DELEGATE_SUCCESS_DIALOG_SHOW:
    case RE_DELEGATE_SUCCESS_DIALOG_SHOW:
    case UN_BOND_SUCCESS_DIALOG_SHOW:
    case WITHDRAW_SUCCESS_DIALOG_SHOW:
        return true;
    case DELEGATIONS_VALIDATORS_LIST_FETCH_IN_PROGRESS:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    tabValue,
    delegate,
    unBond,
    reDelegate,
    tableHeader,
    validatorsList,
    rowData,
    hash,
    delegationsValidators,
    buttonSwitch,
    validatorListFetch,
    delegatorListFetch,
});
