import { combineReducers } from 'redux';
import { DISTRIBUTION_TAB_VALUE_SET } from '../../constants/distribution';
import withdraw from './withdraw';
import withdrawAll from './withdrawAll';

const tabValue = (state = 0, action) => {
    if (action.type === DISTRIBUTION_TAB_VALUE_SET) {
        return action.value;
    }

    return state;
};

export default combineReducers({
    tabValue,
    withdraw,
    withdrawAll,
});
