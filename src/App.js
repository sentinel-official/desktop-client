import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './App.css';
import Router from './containers/Router';
import { authenticated, unauthenticated } from './routes';

const App = () => {
    return (
        <Router
            authenticated={authenticated}
            unauthenticated={unauthenticated}
        />
    );
};

export default App;
