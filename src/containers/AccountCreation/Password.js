import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setKeyPassword } from '../../actions/keys';
import InputField from '../../components/InputField';
import { ValidatePassword } from '../Authentication/_validation';

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
        <InputField
            className="form-control"
            name="password"
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
        value: state.keys.post.password.value,
    };
};

const actionsToProps = {
    onChange: setKeyPassword,
};

export default connect(stateToProps, actionsToProps)(Password);
