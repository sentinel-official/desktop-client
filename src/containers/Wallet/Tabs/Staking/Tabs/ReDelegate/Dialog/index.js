import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { hideReDelegateDialog, reDelegate, showReDelegateSuccessDialog } from '../../../../../../../actions/reDelegate';
import variables from '../../../../../../../dummy/variables';
import price from '../../../../../../../utils/price';
import GasPrice from '../../../../Wallet/Transaction/Send/GasPrice';
import '../../Delegate/DelegateDialog/index.css';
import AmountTextField from './AmountTextField';
import './index.css';
import PasswordTextField from './PasswordTextField';
import ReDelegateButton from './ReDelegateButton';
import ToAddressTextField from './ToAddressTextField';

const ReDelegateDialog = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleDelegate();
        }
    };

    const handleDelegate = () => {
        const data = {
            from: props.activeAccount.name,
            from_address: props.activeAccount.address,
            val_dest_address: props.toAddress.address,
            amount: {
                denom: props.tokenType,
                value: parseFloat(props.amount) * Math.pow(10, 6),
            },
            gas: parseInt(props.gasPrice),
            password: props.password,
        };

        props.reDelegate(data, props.rowData.validator && props.rowData.validator.address, (error) => {
            if (!error) {
                props.showSuccess();
            }
        });
    };

    const disable = props.gasPrice === '' || props.amount === '' || props.password === '' ||
        !props.toAddress.address || props.inProgress;

    return (
        <Dialog
            aria-describedby="re-delegate-dialog-description"
            aria-labelledby="re-delegate-dialog-title"
            className="dialog re_delegate_dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle id="re-delegate-dialog-title">
                <div className="header">
                    <p>
                        <b className="text1">
                            {variables[props.lang].re_delegating}
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
                    <div className="row text_field_div gas_price_text_field to_address">
                        <div>
                            <p className="text_field_label">{variables[props.lang].to_address}</p>
                            <ToAddressTextField/>
                        </div>
                        <div>
                            <p className="text_field_label">{variables[props.lang].gas_price} <span
                                className="text_normal">(tsent)</span></p>
                            <GasPrice/>
                        </div>
                    </div>
                    <div className="row text_field_div">
                        <div>
                            <p className="text_field_label">{variables[props.lang].amount} (TSENT)</p>
                            <AmountTextField/>
                        </div>
                        <div>
                            <p className="text_field_label">{variables[props.lang].password}</p>
                            <PasswordTextField/>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions className="button_div">
                <ReDelegateButton disable={disable} onClick={handleDelegate}/>
            </DialogActions>
        </Dialog>
    );
};

ReDelegateDialog.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    amount: PropTypes.string.isRequired,
    gasPrice: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    reDelegate: PropTypes.func.isRequired,
    rowData: PropTypes.object.isRequired,
    showSuccess: PropTypes.func.isRequired,
    toAddress: PropTypes.object.isRequired,
    tokenType: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        amount: state.staking.reDelegate.reDelegateDialog.amount,
        password: state.staking.reDelegate.reDelegateDialog.password,
        toAddress: state.staking.reDelegate.reDelegateDialog.toAddress,
        inProgress: state.staking.reDelegate.reDelegateDialog.inProgress,
        gasPrice: state.wallet.transactions.send.gasPrice,
        tokenType: state.wallet.transactions.send.token,
        lang: state.language,
        rowData: state.staking.rowData,
        open: state.staking.reDelegate.reDelegateDialog.open,
    };
};

const actionsToProps = {
    handleClose: hideReDelegateDialog,
    showSuccess: showReDelegateSuccessDialog,
    reDelegate,
};

export default connect(stateToProps, actionsToProps)(ReDelegateDialog);
