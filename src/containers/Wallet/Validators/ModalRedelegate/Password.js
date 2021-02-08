import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAccountPassword } from '../../../../actions/account';
import TextInputField from '../../../../components/TextInputField';
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
            error={props.input.error}
            name="password"
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
        input: state.account.password,
    };
};

const actionsToProps = {
    onChange: setAccountPassword,
};

export default connect(stateToProps, actionsToProps)(Password);
