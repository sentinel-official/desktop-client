import * as PropTypes from 'prop-types';
import { ValidatePassword } from '../Authentication/_validation';
import { connect } from 'react-redux';
import { setKeyPassword } from '../../actions/keys';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const Password = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();
        props.onChange({
            value,
            error: ValidatePassword(value),
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
        input: state.keys.post.password,
    };
};

const actionsToProps = {
    onChange: setKeyPassword,
};

export default connect(stateToProps, actionsToProps)(Password);
