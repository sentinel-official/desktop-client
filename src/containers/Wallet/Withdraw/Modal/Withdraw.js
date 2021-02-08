import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txWithdraw } from '../../../../actions/transactions/withdraw';
import Button from '../../../../components/Button';

const Withdraw = (props) => {
    const onClick = () => {
    };

    const disabled = false;

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
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.withdraw.inProgress,
    };
};

const actionsToProps = {
    onClick: txWithdraw,
};

export default connect(stateToProps, actionsToProps)(Withdraw);
