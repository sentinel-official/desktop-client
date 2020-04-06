import { combineReducers } from 'redux';
import {
    FAUCET_TRANSFER_FETCH_ERROR,
    FAUCET_TRANSFER_FETCH_IN_PROGRESS,
    FAUCET_TRANSFER_FETCH_SUCCESS,
} from '../../constants/navbar';
import profile from './profile';
import recoveryAccount from './recoveryAccount';

const faucet = (state = {
    inProgress: false,
    hash: '',
}, action) => {
    switch (action.type) {
    case FAUCET_TRANSFER_FETCH_IN_PROGRESS:
        return {
            ...state,
            inProgress: true,
        };
    case FAUCET_TRANSFER_FETCH_SUCCESS:
        return {
            ...state,
            inProgress: false,
            hash: action.hash,
        };
    case FAUCET_TRANSFER_FETCH_ERROR:
        return {
            ...state,
            inProgress: false,
        };
    default:
        return state;
    }
};

export default combineReducers({
    faucet,
    profile,
    recoveryAccount,
});
