import { InputAdornment } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setNewAccountName } from '../../../../actions/navbar';
import Icon from '../../../../components/Icon';
import TextField from '../../../../components/TextField';
import variables from '../../../../dummy/variables';

const NewAccountNameTextField = (props) => {
    return (
        <TextField
            id="new_account_name_text_field"
            inputProps={{
                endAdornment:
                    <InputAdornment position="end">
                        <Icon
                            className="account_name"
                            icon="account_name"/>
                    </InputAdornment>,
            }}
            name="newAccountName"
            placeholder={variables[props.lang].enter_new_account_name}
            type="text"
            value={props.value}
            onChange={props.onChange}/>
    );
};

NewAccountNameTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.navBar.recoveryAccount.name,
    };
};

const actionsToProps = {
    onChange: setNewAccountName,
};

export default connect(stateToProps, actionsToProps)(NewAccountNameTextField);
