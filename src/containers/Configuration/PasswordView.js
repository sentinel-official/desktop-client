import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setConfigurationPasswordVisible } from '../../actions/configuration';
import React from 'react';
import Visible from '../../components/Visible';

const PasswordView = (props) => {
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

PasswordView.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        visible: state.configuration.password.visible,
    };
};

const actionsToProps = {
    onClick: setConfigurationPasswordVisible,
};

export default connect(stateToProps, actionsToProps)(PasswordView);
