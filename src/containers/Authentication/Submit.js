import * as PropTypes from 'prop-types';
import { ValidatePassword } from './_validation';
import { connect } from 'react-redux';
import { postAuthentication } from '../../actions/authentication';
import Button from '../../components/Button';
import React from 'react';

const Submit = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.onClick(props.history);
    };

    const disabled = (
        ValidatePassword(props.password.value).message !== ''
    );

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
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.authentication.inProgress,
        password: state.authentication.password,
    };
};

const actionsToProps = {
    onClick: postAuthentication,
};

export default connect(stateToProps, actionsToProps)(Submit);
