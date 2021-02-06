import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { txSend } from '../../../../actions/transactions/send';
import Button from '../../../../components/Button';

const Send = (props) => {
    const onClick = () => {
    };

    const disabled = false;

    return (
        <Button
            className="btn button-primary button-large"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Send"
            onClick={onClick}
        />
    );
};

Send.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.send.inProgress,
    };
};

const actionsToProps = {
    onClick: txSend,
};

export default connect(stateToProps, actionsToProps)(Send);
