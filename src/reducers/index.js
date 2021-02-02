import { combineReducers } from 'redux';
import authentication from './authentication';
import configuration from './configuration';
import keys from './keys';
import splash from './splash';

const root = combineReducers({
    authentication,
    configuration,
    keys,
    splash,
});

export default root;
