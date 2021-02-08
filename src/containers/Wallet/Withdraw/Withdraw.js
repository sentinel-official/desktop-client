import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showTxWithdrawModal } from '../../../actions/transactions/withdraw';
import Button from '../../../components/Button';

const Withdraw = (props) => {
    const onClick = () => {
        props.onClick();
    };

    return (
        <Button
            className="btn button-primary button-large"
            disabled={false}
            inProgress={false}
            type="button"
            value="Withdraw"
            onClick={onClick}
        />
    );
};

Withdraw.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const stateToProps = () => {
    return {};
};

const actionsToProps = {
    onClick: showTxWithdrawModal,
};

export default connect(stateToProps, actionsToProps)(Withdraw);
