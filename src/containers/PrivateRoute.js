import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({
    component: Component,
    info,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={
                (props) => {
                    if (info.value === '' || info.expiry === '') {
                        return <Redirect to={'/'}/>;
                    }

                    return <Component {...props}/>;
                }
            }
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.func.isRequired,
    info: PropTypes.shape({
        value: PropTypes.string.isRequired,
        expiry: PropTypes.string.isRequired,
    }),
};

const stateToProps = (state) => {
    return {
        info: state.authentication.info,
    };
};

export default connect(stateToProps)(PrivateRoute);
