import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txSend } from '../../../../actions/transactions/send';
import Button from '../../../../components/Button';
import { ValidateMemo, ValidatePassword } from './_validation';

const Send = (props) => {
    const disabled = (
        ValidateMemo(props.memo.value).message !== '' ||
        ValidatePassword(props.password.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Send"
            onClick={props.onClick}
        />
    );
};

Send.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    memo: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    password: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.send.inProgress,
        memo: state.transactions.send.memo,
        password: state.account.password,
    };
};

const actionsToProps = {
    onClick: txSend,
};

export default connect(stateToProps, actionsToProps)(Send);
