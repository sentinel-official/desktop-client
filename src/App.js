import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import './App.css';
import PrivateRoute from './containers/PrivateRoute';
import Snackbar from './containers/Snackbar';
import routes from './routes';

const App = () => {
    return (
        <>
            <Switch>
                {
                    routes.map((route) => {
                        if (route.private) {
                            return (
                                <PrivateRoute
                                    key={route.path}
                                    exact
                                    component={withRouter(route.component)}
                                    path={route.path}
                                />
                            );
                        }

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
                <Redirect to={'/'}/>
            </Switch>
            <Snackbar/>
        </>
    );
};

export default App;
