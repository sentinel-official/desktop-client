import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txUnbond } from '../../../../actions/transactions/unbond';
import Button from '../../../../components/Button';
import { ValidateAmount, ValidateMemo, ValidatePassword } from './_validation';

const Unbond = (props) => {
    const disabled = (
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
            value="Unbond"
            onClick={props.onClick}
        />
    );
};

Unbond.propTypes = {
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
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        amount: state.transactions.unbond.amount,
        inProgress: state.transactions.unbond.inProgress,
        memo: state.transactions.unbond.memo,
        password: state.account.password,
    };
};

const actionsToProps = {
    onClick: txUnbond,
};

export default connect(stateToProps, actionsToProps)(Unbond);
