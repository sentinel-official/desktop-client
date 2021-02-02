import * as PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import { Route as ReactRouter, Switch, withRouter } from 'react-router-dom';

const Route = ({
    routes,
    redirectTo,
}) => {
    return (
        <Switch>
            {
                routes.map((route) =>
                    <ReactRouter
                        key={route.path}
                        exact
                        component={withRouter(route.component)}
                        path={route.path}
                    />,
                )
            }
            <Redirect to={redirectTo}/>
        </Switch>
    );
};

Route.propTypes = {
    redirectTo: PropTypes.string.isRequired,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            component: PropTypes.any.isRequired,
        }),
    ),
};

export default Route;
