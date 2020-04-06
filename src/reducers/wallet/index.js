import { combineReducers } from 'redux';
import {
    TAB_VALUE_SET,
    WALLET_DETAILS_GET_ERROR,
    WALLET_DETAILS_GET_IN_PROGRESS,
    WALLET_DETAILS_GET_SUCCESS,
} from '../../constants/wallet';
import transactions from './transactions';

const wallets = (state = {
    items: [],
    inProgress: false,
}, action) => {
    switch (action.type) {
    case WALLET_DETAILS_GET_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case WALLET_DETAILS_GET_SUCCESS:
        return {
            ...state,
            items: action.items,
            inProgress: false,
        };
    case WALLET_DETAILS_GET_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

const tabValue = (state = 0, action) => {
    if (action.type === TAB_VALUE_SET) {
        return action.value;
    }

    return state;
};

export default combineReducers({
    wallets,
    tabValue,
    transactions,
});
