import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication';
import Splash from './pages/Splash';
import Configuration from './pages/Configuration';

const routes = [{
    path: '/',
    component: Splash,
}, {
    path: '/authentication',
    component: Authentication,
}, {
    path: '/configuration',
    component: Configuration,
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
