import { combineReducers } from 'redux';
import {
    ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
    ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS,
    DELEGATE_ACTIVE_LIST_HIDE,
    DELEGATE_ACTIVE_LIST_SHOW,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_ERROR,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS,
    IN_ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS,
    SEARCH_VALIDATOR_LIST_SET,
    SORT_ORDER_BY_SET,
    SORT_ORDER_SET,
} from '../../constants/staking';
import delegateDialog from './delegateDialog';

const activeList = (state = true, action) => {
    switch (action.type) {
    case DELEGATE_ACTIVE_LIST_SHOW:
        return true;
    case DELEGATE_ACTIVE_LIST_HIDE:
        return false;
    default:
        return state;
    }
};

const searchList = (state = '', action) => {
    if (action.type === SEARCH_VALIDATOR_LIST_SET) {
        return action.value;
    }

    return state;
};

const order = (state = 'desc', action) => {
    if (action.type === SORT_ORDER_SET) {
        return action.value;
    }

    return state;
};

const orderBy = (state = 'power', action) => {
    if (action.type === SORT_ORDER_BY_SET) {
        return action.value;
    }

    return state;
};

const rowsPerPage = (state = 5) => {
    return state;
};

const page = (state = 0) => {
    return state;
};

const activeValidatorsList = (state = {
    inProgress: false,
    list: [],
}, action) => {
    switch (action.type) {
    case ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case ACTIVE_VALIDATORS_LIST_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const inActiveValidatorsList = (state = {
    inProgress: false,
    list: [],
}, action) => {
    switch (action.type) {
    case IN_ACTIVE_VALIDATORS_LIST_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case IN_ACTIVE_VALIDATORS_LIST_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            list: action.items,
        };
    case IN_ACTIVE_VALIDATORS_LIST_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    activeList,
    searchList,
    order,
    orderBy,
    rowsPerPage,
    page,
    delegateDialog,
    activeValidatorsList,
    inActiveValidatorsList,
});
