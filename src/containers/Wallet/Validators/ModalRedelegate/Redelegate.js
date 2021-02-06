import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txRedelegate } from '../../../../actions/transactions/redelegate';
import Button from '../../../../components/Button';

const Redelegate = (props) => {
    const onClick = () => {
    };

    const disabled = false;

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Redelegate"
            onClick={onClick}
        />
    );
};

Redelegate.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.redelegate.inProgress,
    };
};

const actionsToProps = {
    onClick: txRedelegate,
};

export default connect(stateToProps, actionsToProps)(Redelegate);
