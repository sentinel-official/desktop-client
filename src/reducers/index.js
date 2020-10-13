import { combineReducers } from 'redux';
import application from './application';
import account from './account';

export default combineReducers({
    application,
    account,
});
