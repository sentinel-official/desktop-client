import Lodash from 'lodash';
import { combineReducers } from 'redux';
import {
    VALIDATORS_ACTION_SET,
    VALIDATORS_FILTER_STATUS_SET,
    VALIDATORS_GET_ERROR,
    VALIDATORS_GET_IN_PROGRESS,
    VALIDATORS_GET_SUCCESS,
    VALIDATORS_SET,
} from '../constants/validators';

const items = (state = [], {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_GET_SUCCESS:
    case VALIDATORS_SET:
        return data;
    default:
        return state;
    }
};

const status = (state = 1, {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_FILTER_STATUS_SET:
        return data;
    default:
        return state;
    }
};

const action = (state = 0, {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_ACTION_SET:
        return data;
    case VALIDATORS_FILTER_STATUS_SET:
        return 0;
    default:
        return state;
    }
};

const inProgress = (state = false, {
    type,
}) => {
    switch (type) {
    case VALIDATORS_GET_IN_PROGRESS:
        return true;
    case VALIDATORS_GET_SUCCESS:
    case VALIDATORS_GET_ERROR:
        return false;
    default:
        return state;
    }
};

const totalVotingPower = (state = 0, {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_GET_SUCCESS:
        return Lodash.sumBy(data, 'amount.value');
    default:
        return state;
    }
};

export default combineReducers({
    items,
    status,
    action,
    inProgress,
    totalVotingPower,
});
