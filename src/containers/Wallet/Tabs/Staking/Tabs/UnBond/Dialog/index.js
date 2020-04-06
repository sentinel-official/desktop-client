import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { hideUnBondDialog, showUnBondSuccessDialog, unBond } from '../../../../../../../actions/unBond';
import variables from '../../../../../../../dummy/variables';
import price from '../../../../../../../utils/price';
import GasPriceTextField from '../../../../Wallet/Transaction/Send/GasPrice';
import '../../Delegate/DelegateDialog/index.css';
import AmountTextField from './AmountTextField';
import PasswordTextField from './PasswordTextField';
import UnBondButton from './UnBondButton';

const UnBondDialog = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleUnBond();
        }
    };

    const handleUnBond = () => {
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

        props.unBond(data, props.rowData.validator && props.rowData.validator.address, (error) => {
            if (!error) {
                props.showSuccess();
            }
        });
    };

    const disable = props.gasPrice === '' || props.amount === '' || props.password === '' || props.inProgress;

    return (
        <Dialog
            aria-describedby="un-bond-dialog-description"
            aria-labelledby="un-bond-dialog-title"
            className="dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle id="un-bond-dialog-title">
                <div className="header">
                    <p>
                        <b className="text1">
                            {variables[props.lang].un_bonding}
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
                            <GasPriceTextField/>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions className="button_div">
                <UnBondButton disable={disable} onClick={handleUnBond}/>
            </DialogActions>
        </Dialog>
    );
};

UnBondDialog.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    amount: PropTypes.string.isRequired,
    gasPrice: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
    rowData: PropTypes.object.isRequired,
    showSuccess: PropTypes.func.isRequired,
    tokenType: PropTypes.string.isRequired,
    unBond: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        amount: state.staking.unBond.unBondDialog.amount,
        password: state.staking.unBond.unBondDialog.password,
        inProgress: state.staking.unBond.unBondDialog.inProgress,
        gasPrice: state.wallet.transactions.send.gasPrice,
        tokenType: state.wallet.transactions.send.token,
        lang: state.language,
        rowData: state.staking.rowData,
        open: state.staking.unBond.unBondDialog.open,
    };
};

const actionsToProps = {
    handleClose: hideUnBondDialog,
    showSuccess: showUnBondSuccessDialog,
    unBond,
};

export default connect(stateToProps, actionsToProps)(UnBondDialog);
