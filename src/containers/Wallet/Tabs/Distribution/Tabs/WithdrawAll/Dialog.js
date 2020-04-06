import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { hideWithdrawAllSuccessDialog } from '../../../../../../actions/distribution';
import Icon from '../../../../../../components/Icon';
import variables from '../../../../../../dummy/variables';
import '../../../Staking/Tabs/Delegate/DelegateDialog/index.css';
import '../Withdraw/SuccessDialog/index.css';

const WithdrawAllDialog = (props) => {
    return (
        <Dialog
            aria-describedby="withdraw-all-success-dialog-description"
            aria-labelledby="withdraw-all-success-dialog-title"
            className="dialog success_dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle id="withdraw-all-success-dialog-title">
                <div className="header">
                    <p>
                        <b className="text1">
                            {variables[props.lang].successfully_withdrawn}
                        </b> {variables[props.lang].from}
                        <b className="text2">
                            {variables[props.lang].all}
                        </b>
                    </p>
                </div>
            </DialogTitle>
            <DialogContent className="content">
                <div className="row">
                    <Icon
                        className="success"
                        icon="success"/>
                </div>
                <div className="row">
                    <p className="value">
                        {variables[props.lang].tx_hash}: {props.hash}
                    </p>
                </div>
            </DialogContent>
            <DialogActions className="button_div">
                <Button
                    autoFocus
                    className="active_button"
                    variant="outlined"
                    onClick={props.handleClose}>
                    {variables[props.lang].close}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

WithdrawAllDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        open: state.distribution.withdrawAll.open,
        hash: state.staking.hash,
    };
};

const actionsToProps = {
    handleClose: hideWithdrawAllSuccessDialog,
};

export default connect(stateToProps, actionsToProps)(WithdrawAllDialog);
