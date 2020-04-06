import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setWithdrawPassword } from '../../../../../../../actions/distribution';
import TextField from '../../../../../../../components/TextField';
import variables from '../../../../../../../dummy/variables';

const PasswordTextField = (props) => {
    return (
        <TextField
            id="withdraw_password_text_field"
            name="withdrawPassword"
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
        value: state.distribution.withdraw.withdrawDialog.password,
    };
};

const actionsToProps = {
    onChange: setWithdrawPassword,
};

export default connect(stateToProps, actionsToProps)(PasswordTextField);
