import { combineReducers } from 'redux';
import authentication from './authentication';
import splash from './splash';

const root = combineReducers({
    authentication,
    splash,
});

export default root;
