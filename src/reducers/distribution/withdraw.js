import { combineReducers } from 'redux';
import {
    WITHDRAW_DIALOG_SHOW,
    WITHDRAW_SEARCH_VALIDATOR_LIST_SET,
    WITHDRAW_SORT_ORDER_BY_SET,
    WITHDRAW_SORT_ORDER_SET,
} from '../../constants/distribution';
import withdrawDialog from './withdrawDialog';

const searchList = (state = '', action) => {
    if (action.type === WITHDRAW_SEARCH_VALIDATOR_LIST_SET) {
        return action.value;
    }

    return state;
};

const order = (state = 'desc', action) => {
    if (action.type === WITHDRAW_SORT_ORDER_SET) {
        return action.value;
    }

    return state;
};

const orderBy = (state = 'shares', action) => {
    if (action.type === WITHDRAW_SORT_ORDER_BY_SET) {
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

const rowData = (state = {}, action) => {
    if (action.type === WITHDRAW_DIALOG_SHOW) {
        return action.value;
    }

    return state;
};

export default combineReducers({
    searchList,
    order,
    orderBy,
    rowsPerPage,
    page,
    withdrawDialog,
    rowData,
});
