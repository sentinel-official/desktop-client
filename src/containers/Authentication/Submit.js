import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { postAuthentication } from '../../actions/authentication';
import Button from '../../components/Button';

const Submit = (props) => {
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
            inProgress={props.inProgress}
            value="Login"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    inProgress: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.authentication.inProgress,
        password: state.authentication.password.value,
    };
};

const actionsToProps = {
    onClick: postAuthentication,
};

export default connect(stateToProps, actionsToProps)(Submit);
