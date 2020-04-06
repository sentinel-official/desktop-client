import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setPassword } from '../../../../../../../actions/reDelegate';
import TextField from '../../../../../../../components/TextField';
import variables from '../../../../../../../dummy/variables';

const PasswordTextField = (props) => {
    return (
        <TextField
            id="re_delegate_password_text_field"
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
        value: state.staking.reDelegate.reDelegateDialog.password,
    };
};

const actionsToProps = {
    onChange: setPassword,
};

export default connect(stateToProps, actionsToProps)(PasswordTextField);
