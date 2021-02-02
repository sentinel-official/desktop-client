import { combineReducers } from 'redux';

const rate = (state = 0, {
    type,
    data,
}) => {

};

const inProgress = (state = false, {
    type,
    data,
}) => {

};

export default combineReducers({
    rate,
    inProgress,
});
