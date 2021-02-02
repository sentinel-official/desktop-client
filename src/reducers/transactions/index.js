import { combineReducers } from 'redux';
import delegate from './delegate';
import redelegate from './redelegate';
import send from './send';
import unbond from './unbond';
import vote from './vote';
import withdraw from './withdraw';

export default combineReducers({
    delegate,
    redelegate,
    send,
    unbond,
    vote,
    withdraw,
});
