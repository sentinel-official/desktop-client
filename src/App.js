import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
// import Authentication from './pages/Authentication';
// import Configuration from './pages/Configuration';
import Splash from './pages/Splash';
import Wallet from './pages/Wallet';

const routes = [{
    path: '/',
    component: Splash,
}, {
    path: '/wallet',
    component: Wallet,
}];

const App = () => {
    return (
        <Switch>
            {
                routes.map((route) =>
                    <Route
                        key={route.path}
                        exact
                        component={withRouter(route.component)}
                        path={route.path}/>,
                )
            }
        </Switch>
    );
};

export default App;
