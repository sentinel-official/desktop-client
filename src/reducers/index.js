import { combineReducers } from 'redux';

import loginReducer from '../pages/Login/reducers/LoginReducers';

export default combineReducers({
    // all the reducer will be imported here
    loginReducer: loginReducer
})