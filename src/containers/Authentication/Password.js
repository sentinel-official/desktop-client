import * as PropTypes from 'prop-types';
import { ValidatePassword } from './_validation';
import { connect } from 'react-redux';
import { setAuthenticationPassword, submitAuthenticationPost } from '../../actions/authentication';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const Password = (props) => {
    const onChange = ({ target: { value } }) => {
        value = value.toString();
        props.onChange({
            value,
            error: ValidatePassword(value),
        });
    };

    const onKeyDown = ({ key }) => {
        if (props.submit) {
            return;
        }
        if (key === 'Enter') {
            props.onKeyDown();
        }
    };

    return (
        <TextInputField
            autofocus={true}
            className="form-control"
            error={props.input.error}
            name="Password"
            placeholder="Enter Password"
            required={true}
            type={props.input.visible ? 'text' : 'password'}
            value={props.input.value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

Password.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
        visible: PropTypes.bool.isRequired,
    }).isRequired,
    submit: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        input: state.authentication.password,
        submit: state.authentication.submit,
    };
};

const actionsToProps = {
    onChange: setAuthenticationPassword,
    onKeyDown: submitAuthenticationPost,
};

export default connect(stateToProps, actionsToProps)(Password);
