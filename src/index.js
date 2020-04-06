import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers';
import * as serviceWorker from './service-worker';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunk,
        ),
    ),
);

const router = () => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>
    );
};

ReactDOM.render(router(), document.getElementById('root'));
serviceWorker.unregister();
