import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAuthenticationPassword } from '../../actions/authentication';
import TextInputField from '../../components/TextInputField';
import { ValidatePassword } from './_validation';

const Password = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();
        props.onChange({
            value,
            error: {
                message: ValidatePassword(value).message,
            },
        });
    };

    return (
        <TextInputField
            className="form-control"
            name="Password"
            placeholder="Enter Password"
            required={true}
            type="password"
            value={props.value}
            onChange={onChange}
        />
    );
};

Password.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.authentication.password.value,
    };
};

const actionsToProps = {
    onChange: setAuthenticationPassword,
};

export default connect(stateToProps, actionsToProps)(Password);
