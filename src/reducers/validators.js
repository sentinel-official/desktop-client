import {
    VALIDATORS_FILTER_STATUS_SET,
    VALIDATORS_GET_ERROR,
    VALIDATORS_GET_IN_PROGRESS,
    VALIDATORS_GET_SUCCESS,
    VALIDATORS_SET,
    VALIDATORS_SORT_SET,
} from '../constants/validators';
import { combineReducers } from 'redux';
import { isActive } from '../utils/validator';
import Lodash from 'lodash';

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

const totalVotingPower = (state = {
    active: 0,
    inactive: 0,
}, {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_GET_SUCCESS: {
        const active = Lodash.sumBy(data, (item) => {
            return isActive(item) ? item.amount.value : 0;
        });
        const inactive = Lodash.sumBy(data, (item) => {
            return isActive(item) ? 0 : item.amount.value;
        });

        return {
            ...state,
            active,
            inactive,
        };
    }
    default:
        return state;
    }
};

const sort = (state = {
    by: '',
    order: '',
}, {
    type,
    data,
}) => {
    switch (type) {
    case VALIDATORS_SORT_SET:
        return {
            ...state,
            by: data.by,
            order: data.order,
        };
    default:
        return state;
    }
};

export default combineReducers({
    items,
    status,
    inProgress,
    totalVotingPower,
    sort,
});
