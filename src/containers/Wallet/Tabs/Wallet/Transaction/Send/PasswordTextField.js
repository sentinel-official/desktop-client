import { InputAdornment } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPassword } from '../../../../../../actions/wallet';
import Icon from '../../../../../../components/Icon';
import TextField from '../../../../../../components/TextField';
import variables from '../../../../../../dummy/variables';

class PasswordTextField extends Component {
    componentDidMount () {
        if (this.props.value.length > 0) {
            this.props.onChange('');
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.tabValue !== 0 || this.props.walletTabValue !== 0) {
            if (this.props.value.length > 0) {
                this.props.onChange('');
            }
        }
    }

    render () {
        return (
            <TextField
                className="icon_text_field"
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
                placeholder={variables[this.props.lang].enter_password}
                type="password"
                value={this.props.value}
                onChange={this.props.onChange}/>
        );
    }
}

PasswordTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    tabValue: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    walletTabValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.wallet.transactions.send.password,
        tabValue: state.wallet.tabValue,
        walletTabValue: state.wallet.transactions.tabValue,
    };
};

const actionsToProps = {
    onChange: setPassword,
};

export default connect(stateToProps, actionsToProps)(PasswordTextField);
