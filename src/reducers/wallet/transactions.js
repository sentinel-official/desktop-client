import { combineReducers } from 'redux';
import { TRANSACTION_TAB_VALUE_SET, WALLET_TAB_SHOW, WALLET_TRANSACTION_SHOW } from '../../constants/wallet';
import send from './send';

const display = (state = false, action) => {
    switch (action.type) {
    case WALLET_TRANSACTION_SHOW:
        return true;
    case WALLET_TAB_SHOW:
        return false;
    default:
        return state;
    }
};

const tabValue = (state = 0, action) => {
    if (action.type === TRANSACTION_TAB_VALUE_SET) {
        return action.value;
    }

    return state;
};

export default combineReducers({
    display,
    tabValue,
    send,
});
