import * as PropTypes from 'prop-types';
import { ValidatePassword } from './_validation';
import { connect } from 'react-redux';
import { setAuthenticationPassword } from '../../actions/authentication';
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

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="Password"
            placeholder="Enter Password"
            required={true}
            type="password"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Password.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        input: state.authentication.password,
    };
};

const actionsToProps = {
    onChange: setAuthenticationPassword,
};

export default connect(stateToProps, actionsToProps)(Password);
