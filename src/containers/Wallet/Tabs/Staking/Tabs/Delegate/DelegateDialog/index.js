import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { delegation, hideDelegateDialog, showDelegateSuccessDialog } from '../../../../../../../actions/delegate';
import variables from '../../../../../../../dummy/variables';
import { encodeToBech32 } from '../../../../../../../utils/encode';
import price from '../../../../../../../utils/price';
import GasPrice from '../../../../Wallet/Transaction/Send/GasPrice';
import AmountTextField from './AmountTextField';
import DelegateButton from './DelegateButton';
import './index.css';
import PasswordTextField from './PasswordTextField';

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
            amount: {
                denom: props.tokenType,
                value: parseFloat(props.amount) * Math.pow(10, 6),
            },
            gas: parseInt(props.gasPrice),
            password: props.password,
        };

        props.delegation(data, props.rowData.address && props.rowData.address, (error) => {
            if (!error) {
                props.showSuccess();
            }
        });
    };

    const disable = props.amount === '' || props.password === '' || props.gasPrice === '' || props.inProgress;

    return (
        <Dialog
            aria-describedby="delegate-dialog-description"
            aria-labelledby="delegate-dialog-title"
            className="dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle id="delegate-dialog-title">
                <div className="header">
                    <p>
                        <b className="text1">
                            {variables[props.lang].delegating}
                        </b> {variables[props.lang].to}
                        <b className="text2">
                            {props.rowData.description &&
                            props.rowData.description.moniker &&
                            props.rowData.description.moniker}
                        </b>
                    </p>
                </div>
            </DialogTitle>
            <DialogContent className="content">
                <form noValidate autoComplete="off" onKeyPress={handleKeyPress}>
                    <div className="row">
                        <p className="heading_text">
                            {variables[props.lang].operator_address}
                        </p>
                        <p className="value">
                            {props.rowData.address && encodeToBech32(props.rowData.address, 'sentvaloper')}
                        </p>
                    </div>
                    <div className="row">
                        <p className="heading_text">
                            {variables[props.lang].commission_rate}
                        </p>
                        <p className="value">
                            {props.rowData.commission &&
                            props.rowData.commission.rate &&
                            props.rowData.commission.rate * 100 + '%'}
                            {props.rowData.commission &&
                            props.rowData.commission.rate &&
                            props.rowData.commission.updated_at &&
                            ' (Updated ' +
                            moment(
                                new Date(props.rowData.commission.updated_at),
                                'YYYYMMDD').fromNow() + ')'}
                        </p>
                    </div>
                    <div className="row">
                        <p className="heading_text">{variables[props.lang].tokens}</p>
                        <p className="value">{props.rowData.power && price(props.rowData.power)}</p>
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
                    <div className="row text_field_div gas_price_text_field">
                        <div>
                            <p className="text_field_label">{variables[props.lang].gas_price} <span
                                className="text_normal">(tsent)</span></p>
                            <GasPrice/>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions className="button_div">
                <DelegateButton disable={disable} onClick={handleDelegate}/>
            </DialogActions>
        </Dialog>
    );
};

DelegateDialog.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    amount: PropTypes.string.isRequired,
    delegation: PropTypes.func.isRequired,
    gasPrice: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    rowData: PropTypes.object.isRequired,
    showSuccess: PropTypes.func.isRequired,
    tokenType: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        rowData: state.staking.rowData,
        open: state.staking.delegate.delegateDialog.open,
        activeAccount: state.keys.activeAccount,
        amount: state.staking.delegate.delegateDialog.amount,
        password: state.staking.delegate.delegateDialog.password,
        inProgress: state.staking.delegate.delegateDialog.inProgress,
        gasPrice: state.wallet.transactions.send.gasPrice,
        tokenType: state.wallet.transactions.send.token,
    };
};

const actionsToProps = {
    handleClose: hideDelegateDialog,
    showSuccess: showDelegateSuccessDialog,
    delegation,
};

export default connect(stateToProps, actionsToProps)(DelegateDialog);
