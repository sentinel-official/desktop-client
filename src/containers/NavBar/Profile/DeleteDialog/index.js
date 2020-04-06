import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { deleteKeys, fetchKeys } from '../../../../actions/keys';
import { hideDeleteAccountDialog } from '../../../../actions/navbar';
import variables from '../../../../dummy/variables';
import '../../../Wallet/Tabs/Staking/Tabs/Delegate/DelegateDialog/index.css';
import DeleteButton from './DeleteButton';
import './index.css';
import PasswordTextField from './PasswordTextField';

const DeleteAccountDialog = (props) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !disable) {
            handleDelete();
        }
    };

    const handleDelete = () => {
        const data = {
            password: props.password,
        };

        props.deleteKeys(data, props.name, (error) => {
            if (!error) {
                props.fetchKeys((error) => {
                    if (!error && props.accounts.length === 1) {
                        props.history.push({
                            pathname: '/createAccount',
                        });
                    }
                });
            }
        });
    };

    const disable = props.name === '' || props.password === '' || props.inProgress;

    return (
        <Dialog
            aria-describedby="delete-account-dialog-description"
            aria-labelledby="delete-account-dialog-title"
            className="dialog"
            open={props.open}
            onClose={props.handleClose}>
            <DialogTitle id="delete-account-dialog-title">
                <div className="header">
                    <p>
                        <b className="text1">
                            {variables[props.lang].are_you_sure}
                        </b>, {variables[props.lang].do_you_want_to}
                        <b className="text2">
                            {variables[props.lang].delete_account} {props.name}?
                        </b>
                    </p>
                </div>
            </DialogTitle>
            <DialogContent className="content">
                <form
                    noValidate
                    autoComplete="off"
                    onKeyPress={handleKeyPress}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                    <div className="row text_field_div">
                        <div>
                            <p className="text_field_label">{variables[props.lang].password}</p>
                            <PasswordTextField/>
                        </div>
                    </div>
                </form>
            </DialogContent>
            <DialogActions className="button_div">
                <DeleteButton disable={disable} onClick={handleDelete}/>
            </DialogActions>
        </Dialog>
    );
};

DeleteAccountDialog.propTypes = {
    accounts: PropTypes.array.isRequired,
    deleteKeys: PropTypes.func.isRequired,
    fetchKeys: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    inProgress: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    password: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        accounts: state.keys.accounts.list,
        lang: state.language,
        open: state.navBar.profile.dialog,
        name: state.navBar.profile.accountName,
        password: state.navBar.profile.password,
        inProgress: state.navBar.profile.deleteInProgress,
    };
};

const actionsToProps = {
    handleClose: hideDeleteAccountDialog,
    deleteKeys,
    fetchKeys,
};

export default withRouter(connect(stateToProps, actionsToProps)(DeleteAccountDialog));
