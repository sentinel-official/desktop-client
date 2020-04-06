import { combineReducers } from 'redux';
import {
    UN_BOND_SEARCH_VALIDATOR_LIST_SET,
    UN_BOND_SORT_ORDER_BY_SET,
    UN_BOND_SORT_ORDER_SET,
} from '../../constants/staking';
import unBondDialog from './unBondDialog';

const searchList = (state = '', action) => {
    if (action.type === UN_BOND_SEARCH_VALIDATOR_LIST_SET) {
        return action.value;
    }

    return state;
};

const order = (state = 'desc', action) => {
    if (action.type === UN_BOND_SORT_ORDER_SET) {
        return action.value;
    }

    return state;
};

const orderBy = (state = 'shares', action) => {
    if (action.type === UN_BOND_SORT_ORDER_BY_SET) {
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
    order,
    orderBy,
    rowsPerPage,
    page,
    unBondDialog,
});
