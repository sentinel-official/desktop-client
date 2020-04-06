import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import Home from './containers/Home';
import RecoveryAccount from './containers/NavBar/Profile/RecoveryAccount';
import NewAccount from './containers/NewAccount';
import Wallet from './containers/Wallet';

const routes = [{
    exact: true,
    path: '/dashboard',
    component: Dashboard,
}, {
    exact: true,
    path: '/createAccount',
    component: NewAccount,
}, {
    exact: true,
    path: '/wallet',
    component: Wallet,
}, {
    exact: true,
    path: '/',
    component: Home,
}, {
    exact: true,
    path: '/recoveryAccount',
    component: RecoveryAccount,
}];

const Router = () => {
    return (
        <Switch>
            {
                routes.map((route) =>
                    <Route
                        key={route.path}
                        exact
                        component={route.component}
                        path={route.path}/>,
                )
            }
        </Switch>
    );
};

export default Router;
