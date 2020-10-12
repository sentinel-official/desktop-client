import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initState,
    applyMiddleware(...middleware),
);

export default store;
