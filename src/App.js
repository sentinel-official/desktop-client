import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import './App.css';
import PrivateRoute from './containers/PrivateRoute';
import { authenticated, unauthenticated } from './routes';

const App = () => {
    return (
        <Switch>
            {
                unauthenticated.map((route) => {
                    return (
                        <Route
                            key={route.path}
                            exact
                            component={withRouter(route.component)}
                            path={route.path}
                        />
                    );
                })
            }
            {
                authenticated.map((route) => {
                    return (
                        <PrivateRoute
                            key={route.path}
                            exact
                            component={withRouter(route.component)}
                            path={route.path}
                        />
                    );
                })
            }
        </Switch>
    );
};

export default App;
