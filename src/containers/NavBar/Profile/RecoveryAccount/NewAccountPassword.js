import { InputAdornment } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setNewAccountPassword } from '../../../../actions/navbar';
import Icon from '../../../../components/Icon';
import TextField from '../../../../components/TextField';
import variables from '../../../../dummy/variables';

const NewAccountPasswordTextField = (props) => {
    return (
        <TextField
            id="new_account_password_text_field"
            inputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Icon
                            className="password"
                            icon="password"/>
                    </InputAdornment>,
            }}
            name="newAccountPassword"
            placeholder={variables[props.lang].enter_new_account_password}
            type="password"
            value={props.value}
            onChange={props.onChange}/>
    );
};

NewAccountPasswordTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.navBar.recoveryAccount.password,
    };
};

const actionsToProps = {
    onChange: setNewAccountPassword,
};

export default connect(stateToProps, actionsToProps)(NewAccountPasswordTextField);
