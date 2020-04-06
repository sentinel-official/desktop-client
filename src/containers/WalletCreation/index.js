import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAccountCreationStep } from '../../actions/account';
import { addKeys } from '../../actions/keys';
import GoBack from '../../components/GoBack';
import variables from '../../dummy/variables';
import AccountNameTextField from './AccountNameTextField';
import CreateAccountButton from './CreateAccountButton';
import './index.css';
import PasswordTextField from './PasswordTextField';

const WalletCreation = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleCreateAccount();
        }
    };

    const handleCreateAccount = () => {
        const data = {
            name: props.name,
            password: props.password,
        };

        props.addKeys(data, (error) => {
            if (!error) {
                props.onChange(2);
            }
        });
    };

    const disable = props.name === '' || props.password === '' || props.password.length < 8 || props.inProgress;

    return (
        <div className="wallet_creation_div">
            {props.keys && props.keys.length > 0
                ? <GoBack lang={props.lang} onClick={() => props.history.goBack()}/>
                : null}
            <div className="wallet_creation">
                <p className="heading_text">{variables[props.lang].wallet_creation}</p>
                <form noValidate autoComplete="off" onKeyPress={handleKeyPress}>
                    <AccountNameTextField/>
                    <PasswordTextField/>
                    <CreateAccountButton disable={disable} onClick={handleCreateAccount}/>
                </form>
            </div>
        </div>
    );
};

WalletCreation.propTypes = {
    addKeys: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    inProgress: PropTypes.bool.isRequired,
    keys: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        keys: state.keys.accounts.list,
        lang: state.language,
        password: state.account.new.password,
        name: state.account.new.name,
        inProgress: state.account.new.inProgress,
    };
};

const actionsToProps = {
    onChange: setAccountCreationStep,
    addKeys,
};

export default withRouter(connect(stateToProps, actionsToProps)(WalletCreation));
