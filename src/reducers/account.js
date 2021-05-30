import { ACCOUNT_GET_ERROR, ACCOUNT_GET_IN_PROGRESS, ACCOUNT_GET_SUCCESS } from '../constants/account';
import { combineReducers } from 'redux';

const info = (state = {
    address: '',
    publicKey: '',
    balance: {
        denom: '',
        value: 0,
    },
    sequence: 0,
    number: 0,
}, {
    type,
    data,
}) => {
    switch (type) {
    case ACCOUNT_GET_SUCCESS: {
        if (data) {
            return {
                ...state,
                address: data.address,
                publicKey: data['pub_key'],
                balance: data.balance,
                sequence: data.sequence,
                number: data.number,
            };
        }

        return {
            address: '',
            publicKey: '',
            balance: {
                denom: '',
                value: 0,
            },
            sequence: 0,
            number: 0,
        };
    }
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case ACCOUNT_GET_IN_PROGRESS:
        return true;
    case ACCOUNT_GET_SUCCESS:
    case ACCOUNT_GET_ERROR:
        return false;
    default:
        return state;
    }
};

export default combineReducers({
    info,
    inProgress,
});
