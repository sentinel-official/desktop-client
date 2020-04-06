import { InputAdornment } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAccountName } from '../../actions/account';
import Icon from '../../components/Icon';
import TextField from '../../components/TextField';
import variables from '../../dummy/variables';

const AccountNameTextField = (props) => {
    return (
        <TextField
            id="account_name_text_field"
            inputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Icon
                            className="account_name"
                            icon="account_name"/>
                    </InputAdornment>,
            }}
            name="accountName"
            placeholder={variables[props.lang].enter_account_name}
            type="text"
            value={props.value}
            onChange={props.onChange}/>
    );
};

AccountNameTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.account.new.name,
    };
};

const actionsToProps = {
    onChange: setAccountName,
};

export default connect(stateToProps, actionsToProps)(AccountNameTextField);
