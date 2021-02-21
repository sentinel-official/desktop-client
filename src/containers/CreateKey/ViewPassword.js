import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setKeyPasswordVisible } from '../../actions/keys';
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
        visible: state.keys.post.password.visible,
    };
};

const actionsToProps = {
    onClick: setKeyPasswordVisible,
};

export default connect(stateToProps, actionsToProps)(ViewPassword);
