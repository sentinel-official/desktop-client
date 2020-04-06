import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showWithdrawAllSuccessDialog, withdrawAll } from '../../../../../../actions/distribution';
import variables from '../../../../../../dummy/variables';
import price from '../../../../../../utils/price';
import GasPrice from '../../../Wallet/Transaction/Send/GasPrice';
import Dialog from './Dialog';
import './index.css';
import PasswordTextField from './PasswordTextField';
import WithdrawButton from './WithdrawButton';

const WithdrawAll = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleWithdrawAll();
        }
    };

    const handleWithdrawAll = () => {
        const data = {
            from: props.activeAccount.name,
            from_address: props.activeAccount.address,
            gas: parseInt(props.gasPrice),
            password: props.password,
        };
        props.withdrawAll(data, (error) => {
            if (!error) {
                props.showDialog();
            }
        });
    };

    const disable = props.password === '' || props.gasPrice === '' || props.inProgress;

    return (
        <div className="withdraw_all card">
            <form noValidate autoComplete="off" onKeyPress={handleKeyPress}>
                <div className="row">
                    <p className="heading_text">{variables[props.lang].withdraw_all}</p>
                    <p className="tokens">{variables[props.lang].available_tokens}:
                        <b>
                            {props.tokens.length > 0 &&
                            props.tokens[0].value &&
                            price((props.tokens[0].value * Math.pow(10, -6)).toFixed(6))}
                        </b>
                    </p>
                </div>
                <div className="text_field_div">
                    <p className="text_field_label">{variables[props.lang].gas_price} <span
                        className="text_normal">(tsent)</span></p>
                    <GasPrice/>
                </div>
                <div className="text_field_div">
                    <p className="text_field_label">{variables[props.lang].password}</p>
                    <PasswordTextField/>
                </div>
                <WithdrawButton disable={disable} onClick={handleWithdrawAll}/>
                <Dialog/>
            </form>
        </div>
    );
};

WithdrawAll.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    gasPrice: PropTypes.string.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    showDialog: PropTypes.func.isRequired,
    tokens: PropTypes.array.isRequired,
    withdrawAll: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        password: state.distribution.withdrawAll.password,
        inProgress: state.distribution.withdrawAll.inProgress,
        gasPrice: state.wallet.transactions.send.gasPrice,
        lang: state.language,
        tokens: state.wallet.wallets.items,
    };
};

const actionsToProps = {
    showDialog: showWithdrawAllSuccessDialog,
    withdrawAll,
};

export default connect(stateToProps, actionsToProps)(WithdrawAll);
