import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txRedelegate } from '../../../../actions/transactions/redelegate';
import Button from '../../../../components/Button';
import { ValidateAmount, ValidateMemo, ValidatePassword, ValidateToAddress } from './_validation';

const Redelegate = (props) => {
    const disabled = (
        ValidateToAddress(props.to.value).message !== '' ||
        ValidateAmount(props.amount.value).message !== '' ||
        ValidateMemo(props.memo.value).message !== '' ||
        ValidatePassword(props.password.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Redelegate"
            onClick={props.onClick}
        />
    );
};

Redelegate.propTypes = {
    amount: PropTypes.shape({
        value: PropTypes.number.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
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
    to: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        amount: state.transactions.redelegate.amount,
        inProgress: state.transactions.redelegate.inProgress,
        memo: state.transactions.redelegate.memo,
        password: state.account.password,
        to: state.transactions.redelegate.to,
    };
};

const actionsToProps = {
    onClick: txRedelegate,
};

export default connect(stateToProps, actionsToProps)(Redelegate);
