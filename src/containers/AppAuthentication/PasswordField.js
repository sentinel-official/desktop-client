import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import TextField from '../../components/TextField';
import { setPassword } from '../../actions/account';

const PasswordField = (props) => {
    return (
        <TextField id="password_text_field" name="password" type="password" value={props.value} onChange={props.onChange}/>
    );
};

PasswordField.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.password,
    };
};

const actionsToProps = {
    onChange: setPassword,
};

export default connect(stateToProps, actionsToProps)(PasswordField);
