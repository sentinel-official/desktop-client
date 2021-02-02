import { combineReducers } from 'redux';

const info = (state = {
    address: '',
    pub_key: '',
    coins: [],
    sequence: 0,
    number: 0,
}, {
    type,
    data,
}) => {

};

const inProgress = (state = false, {
    type,
    data,
}) => {

};

const password = (state = '', {
    type,
    data,
}) => {

};

export default combineReducers({
    info,
    inProgress,
    password,
});
