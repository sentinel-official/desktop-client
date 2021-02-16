import * as PropTypes from 'prop-types';
import { ValidatePassword } from './_validation';
import { connect } from 'react-redux';
import { setAccountPassword } from '../../actions/account';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const AccountPassword = (props) => {
    const onChange = ({ target: { value } }) => {
        value = value.toString();

        props.onChange({
            value,
            error: ValidatePassword(value),
        });
    };

    return (
        <TextInputField
            autofocus={false}
            className="form-control"
            error={props.input.error}
            name="password"
            placeholder="Enter Password"
            required={true}
            type={props.input.visible ? 'text' : 'password'}
            value={props.input.value}
            onChange={onChange}
        />
    );
};

AccountPassword.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
        visible: PropTypes.bool.isRequired,
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

export default connect(stateToProps, actionsToProps)(AccountPassword);
