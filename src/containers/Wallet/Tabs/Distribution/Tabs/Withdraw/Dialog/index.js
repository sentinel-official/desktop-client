import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { hideWithdrawDialog, showWithdrawSuccessDialog, withdraw } from '../../../../../../../actions/distribution';
import variables from '../../../../../../../dummy/variables';
import price from '../../../../../../../utils/price';
import '../../../../Staking/Tabs/Delegate/DelegateDialog/index.css';
import GasPrice from '../../../../Wallet/Transaction/Send/GasPrice';
import PasswordTextField from './PasswordTextField';
import WithdrawButton from './WithdrawButton';

const DelegateDialog = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleDelegate();
        }
    };

    const handleDelegate = () => {
        const data = {
            from: props.activeAccount.name,
            from_address: props.activeAccount.address,
            gas: parseInt(props.gasPrice),
            password: props.password,
        };

        props.withdraw(data, props.rowData.validator && props.rowData.validator.address, (error) => {
            if (!error) {
                props.showSuccess();
            }
        });
    };

    const disable = props.gasPrice === '' || props.password === '' || props.inProgress;

    return (
        <Dialog
            aria-describedby="withdraw-dialog-description"
            aria-labelledby="withdraw-dialog-title"
            className="dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle id="withdraw-dialog-title">
                <div className="header">
                    <p>
                        <b className="text1">
                            {variables[props.lang]['withdraw_rewards']}
                        </b> {variables[props.lang].from}
                        <b className="text2">
                            {props.rowData.validator &&
                            props.rowData.validator.description &&
                            props.rowData.validator.description.moniker &&
                            props.rowData.validator.description.moniker}
                        </b>
                    </p>
                </div>
            </DialogTitle>
            <DialogContent className="content">
                <form noValidate autoComplete="off" onKeyPress={handleKeyPress}>
                    <div className="row">
                        <p className="heading_text">{variables[props.lang].amount}</p>
                        <p className="value">
                            {props.rowData.shares &&
                            price((Math.round(
                                (props.rowData.validator && props.rowData.validator.amount && props.rowData.validator.amount.value) /
                                (props.rowData.validator && props.rowData.validator.delegator_shares) * props.rowData.shares) *
                                Math.pow(10, -6)).toFixed(6))}
                        </p>
                    </div>
                    <div className="row text_field_div">
                        <div>
                            <p className="text_field_label">{variables[props.lang].gas_price} (tsent)</p>
                            <GasPrice/>
                        </div>
                        <div>
                            <p className="text_field_label">{variables[props.lang].password}</p>
                            <PasswordTextField/>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions className="button_div">
                <WithdrawButton disable={disable} onClick={handleDelegate}/>
            </DialogActions>
        </Dialog>
    );
};

DelegateDialog.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    gasPrice: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    rowData: PropTypes.object.isRequired,
    showSuccess: PropTypes.func.isRequired,
    tokenType: PropTypes.string.isRequired,
    withdraw: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        password: state.distribution.withdraw.withdrawDialog.password,
        inProgress: state.distribution.withdraw.withdrawDialog.inProgress,
        gasPrice: state.wallet.transactions.send.gasPrice,
        tokenType: state.wallet.transactions.send.token,
        lang: state.language,
        rowData: state.distribution.withdraw.rowData,
        open: state.distribution.withdraw.withdrawDialog.open,
    };
};

const actionsToProps = {
    handleClose: hideWithdrawDialog,
    showSuccess: showWithdrawSuccessDialog,
    withdraw,
};

export default connect(stateToProps, actionsToProps)(DelegateDialog);
