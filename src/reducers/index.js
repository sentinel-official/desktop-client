import { combineReducers } from 'redux';
import account from './account';
import distribution from './distribution';
import keys from './keys';
import language from './language';
import navBar from './navbar';
import sidebar from './sidebar';
import snackbar from './snackbar';
import staking from './staking';
import transactions from './transactions';
import wallet from './wallet';

export default combineReducers({
    sidebar,
    account,
    wallet,
    transactions,
    navBar,
    staking,
    distribution,
    snackbar,
    keys,
    language,
});
