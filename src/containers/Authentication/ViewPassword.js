import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAuthenticationPasswordVisible } from '../../actions/authentication';
import React from 'react';
import Visible from '../../components/Visible';

const ViewPassword = (props) => {
    const onClick = () => {
        props.onClick({
            visible: props.visible === false,
        });
    };

    return (
        <Visible
            visible={props.visible}
            onClick={onClick}
        />
    );
};

ViewPassword.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        visible: state.authentication.password.visible,
    };
};

const actionsToProps = {
    onClick: setAuthenticationPasswordVisible,
};

export default connect(stateToProps, actionsToProps)(ViewPassword);
