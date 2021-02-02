import { combineReducers } from 'redux';

const items = (state = [], {
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
    items,
    inProgress,
});
