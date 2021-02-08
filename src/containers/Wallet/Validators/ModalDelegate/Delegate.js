import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txDelegate } from '../../../../actions/transactions/delegate';
import Button from '../../../../components/Button';

const Delegate = (props) => {
    const onClick = () => {
    };

    const disabled = false;

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
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.delegate.inProgress,
    };
};

const actionsToProps = {
    onClick: txDelegate,
};

export default connect(stateToProps, actionsToProps)(Delegate);
