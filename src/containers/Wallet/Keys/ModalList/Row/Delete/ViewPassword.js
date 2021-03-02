import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setKeysDeletePasswordVisible } from '../../../../../../actions/keys';
import React from 'react';
import Visible from '../../../../../../components/Visible';

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
        visible: state.keys.delete.password.visible,
    };
};

const actionsToProps = {
    onClick: setKeysDeletePasswordVisible,
};

export default connect(stateToProps, actionsToProps)(ViewPassword);
