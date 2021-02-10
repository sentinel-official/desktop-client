import * as PropTypes from 'prop-types';
import { ValidateFrom } from './_validation';
import { connect } from 'react-redux';
import { showTxWithdrawModal } from '../../../actions/transactions/withdraw';
import Button from '../../../components/Button';
import React from 'react';

const Withdraw = (props) => {
    const disabled = (
        ValidateFrom(props.from.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={false}
            type="button"
            value="Withdraw"
            onClick={props.onClick}
        />
    );
};

Withdraw.propTypes = {
    from: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        from: state.transactions.withdraw.from,
    };
};

const actionsToProps = {
    onClick: showTxWithdrawModal,
};

export default connect(stateToProps, actionsToProps)(Withdraw);
