import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './reducers';
import reportWebVitals from './reportWebVitals';
import Axios, { withInterceptors } from './services/axios';

const store = createStore(
    reducer,
    composeWithDevTools({
        trace: true,
    })(applyMiddleware(thunk)),
);

withInterceptors(Axios, store);

const app = (
    <React.StrictMode>
        <Provider store={store}>
            <MemoryRouter>
                <App/>
            </MemoryRouter>
        </Provider>
    </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
reportWebVitals();
