import * as PropTypes from 'prop-types';
import { ValidateMemo } from './_validation';
import { connect } from 'react-redux';
import { txWithdraw } from '../../../../actions/transactions/withdraw';
import Button from '../../../../components/Button';
import React from 'react';

const Withdraw = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.txWithdraw();
    };

    const disabled = (
        ValidateMemo(props.memo.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Withdraw"
            onClick={onClick}
        />
    );
};

Withdraw.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    memo: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    txWithdraw: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.withdraw.inProgress,
        memo: state.transactions.withdraw.memo,
    };
};

const actionsToProps = {
    txWithdraw,
};

export default connect(stateToProps, actionsToProps)(Withdraw);
