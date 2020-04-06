import { combineReducers } from 'redux';
import {
    RE_DELEGATE_SEARCH_VALIDATOR_LIST_SET,
    RE_DELEGATE_SORT_ORDER_BY_SET,
    RE_DELEGATE_SORT_ORDER_SET,
} from '../../constants/staking';
import { delegationHeader } from '../../dummy/validatorsList';
import reDelegateDialog from './reDelegateDialog';

const searchList = (state = '', action) => {
    if (action.type === RE_DELEGATE_SEARCH_VALIDATOR_LIST_SET) {
        return action.value;
    }

    return state;
};

const tableHeader = (state = delegationHeader) => {
    return state;
};

const order = (state = 'desc', action) => {
    if (action.type === RE_DELEGATE_SORT_ORDER_SET) {
        return action.value;
    }

    return state;
};

const orderBy = (state = 'shares', action) => {
    if (action.type === RE_DELEGATE_SORT_ORDER_BY_SET) {
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

export default combineReducers({
    searchList,
    tableHeader,
    order,
    orderBy,
    rowsPerPage,
    page,
    reDelegateDialog,
});
