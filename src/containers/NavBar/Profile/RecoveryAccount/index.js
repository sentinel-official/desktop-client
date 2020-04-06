import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setAccountCreationStep } from '../../../../actions/account';
import { addKeys, fetchKeys } from '../../../../actions/keys';
import GoBack from '../../../../components/GoBack';
import variables from '../../../../dummy/variables';
import ImportButton from './ImportButton';
import './index.css';
import NewAccountNameTextField from './NewAccountName';
import NewAccountPasswordTextField from './NewAccountPassword';
import RecoveryButton from './RecoveryButton';
import Seed from './Seed';

const RecoveryAccount = (props) => {
    const handleBack = () => {
        props.history.goBack();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleRecoveryAccount();
        }
    };

    const handleRecoveryAccount = () => {
        const data = {
            name: props.name,
            password: props.password,
            mnemonic: props.seed,
        };

        props.addKeys(data, (error) => {
            if (!error) {
                props.fetchKeys();
                handleBack();
            }
        });
    };

    const disable = props.name === '' || props.password === '' || props.seed === '';

    return (
        <div className="recovery_account">
            <div className="header">
                {props.keys && props.keys.length > 0
                    ? <GoBack
                        lang={props.lang}
                        onClick={handleBack}/>
                    : null}
                <div className="import_button">
                    <ImportButton/>
                </div>
            </div>
            <div className="content">
                <p className="heading_text">
                    {variables[props.lang].recover_add_account}
                </p>
                <form
                    noValidate
                    autoComplete="off"
                    onKeyPress={handleKeyPress}>
                    <NewAccountNameTextField/>
                    <NewAccountPasswordTextField/>
                    <Seed/>
                    <RecoveryButton
                        disable={disable}
                        onClick={handleRecoveryAccount}/>
                </form>
            </div>
        </div>
    );
};

RecoveryAccount.propTypes = {
    addKeys: PropTypes.func.isRequired,
    fetchKeys: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    keys: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    seed: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        keys: state.keys.accounts.list,
        password: state.navBar.recoveryAccount.password,
        name: state.navBar.recoveryAccount.name,
        seed: state.navBar.recoveryAccount.seed,
        lang: state.language,
    };
};

const actionsToProps = {
    onChange: setAccountCreationStep,
    addKeys,
    fetchKeys,
};

export default withRouter(connect(stateToProps, actionsToProps)(RecoveryAccount));
