import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Route from '../components/Route';

const Router = ({
    authenticated,
    info,
    unauthenticated,
}) => {
    if (info.value === '' || info.expiry === '') {
        return (
            <Route
                redirectTo="/"
                routes={unauthenticated}
            />
        );
    }

    return (
        <Route
            redirectTo="/"
            routes={authenticated}
        />
    );
};

Router.propTypes = {
    authenticated: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            component: PropTypes.any.isRequired,
        }),
    ),
    info: PropTypes.shape({
        value: PropTypes.string.isRequired,
        expiry: PropTypes.string.isRequired,
    }),
    unauthenticated: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            component: PropTypes.any.isRequired,
        }),
    ),
};

const stateToProps = (state) => {
    return {
        info: state.authentication.info,
    };
};

export default connect(stateToProps)(Router);
