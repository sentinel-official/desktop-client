import { InputAdornment } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setPassword } from '../../actions/account';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import variables from '../../dummy/variables';

const PasswordTextField = (props) => {
    return (
        <TextField
            error={props.value !== '' && props.value.length < 8}
            errorText={props.value !== '' && props.value.length < 8 ? 'Minimum 8 characters required!' : ''}
            id="password_text_field"
            inputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Icon
                            className="password"
                            icon="password"/>
                    </InputAdornment>,
            }}
            name="password"
            placeholder={variables[props.lang].enter_password}
            type="password"
            value={props.value}
            onChange={props.onChange}/>
    );
};

PasswordTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.account.new.password,
    };
};

const actionsToProps = {
    onChange: setPassword,
};

export default connect(stateToProps, actionsToProps)(PasswordTextField);
