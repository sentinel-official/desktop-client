import * as PropTypes from 'prop-types';
import { ValidateAmount } from './_validation';
import { ValidateMemo, ValidatePassword } from '../../../common/_validation';
import { connect } from 'react-redux';
import { txDelegate } from '../../../../actions/transactions/delegate';
import Button from '../../../../components/Button';
import React from 'react';

const Delegate = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.txDelegate();
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
            value="Delegate"
            onClick={onClick}
        />
    );
};

Delegate.propTypes = {
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
    txDelegate: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        amount: state.transactions.delegate.amount,
        inProgress: state.transactions.delegate.inProgress,
        memo: state.transactions.delegate.memo,
        password: state.account.password,
    };
};

const actionsToProps = {
    txDelegate,
};

export default connect(stateToProps, actionsToProps)(Delegate);
