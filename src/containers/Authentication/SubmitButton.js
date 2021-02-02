import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { postAuthentication } from '../../actions/authentication';
import Button from '../../components/Button';

const SubmitButton = (props) => {
    const onClick = () => {
        props.onClick({
            password: props.password.trim(),
        }, props.history, () => {
        });
    };

    const disabled = props.password === '';

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            loading={false}
            value="Login"
            onClick={onClick}
        />
    );
};

SubmitButton.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    password: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        password: state.authentication.password.value,
    };
};

const actionsToProps = {
    onClick: postAuthentication,
};

export default connect(stateToProps, actionsToProps)(SubmitButton);
