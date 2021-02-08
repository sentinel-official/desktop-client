import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txUnbond } from '../../../../actions/transactions/unbond';
import Button from '../../../../components/Button';

const Unbond = (props) => {
    const onClick = () => {
    };

    const disabled = false;

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
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.unbond.inProgress,
    };
};

const actionsToProps = {
    onClick: txUnbond,
};

export default connect(stateToProps, actionsToProps)(Unbond);
