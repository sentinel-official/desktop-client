import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAccountPasswordVisible } from '../../actions/account';
import React from 'react';
import Visible from '../../components/Visible';

const AccountPasswordView = (props) => {
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

AccountPasswordView.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        visible: state.account.password.visible,
    };
};

const actionsToProps = {
    onClick: setAccountPasswordVisible,
};

export default connect(stateToProps, actionsToProps)(AccountPasswordView);
