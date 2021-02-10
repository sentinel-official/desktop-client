import * as PropTypes from 'prop-types';
import { ValidateAmount, ValidateMemo, ValidatePassword } from './_validation';
import { connect } from 'react-redux';
import { txUnbond } from '../../../../actions/transactions/unbond';
import Button from '../../../../components/Button';
import React from 'react';

const Unbond = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.txUnbond();
    };

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
            onClick={onClick}
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
    txUnbond: PropTypes.func.isRequired,
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
    txUnbond,
};

export default connect(stateToProps, actionsToProps)(Unbond);
