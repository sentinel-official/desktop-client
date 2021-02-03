import { combineReducers } from 'redux';
import authentication from './authentication';
import configuration from './configuration';
import keys from './keys';
import snackbar from './snackbar';
import splash from './splash';

const root = combineReducers({
    authentication,
    configuration,
    keys,
    snackbar,
    splash,
});

export default root;
