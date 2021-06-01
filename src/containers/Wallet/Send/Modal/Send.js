import * as PropTypes from 'prop-types';
import { ValidateMemo } from '../../../common/_validation';
import { connect } from 'react-redux';
import { txSend } from '../../../../actions/transactions/send';
import Button from '../../../../components/Button';
import React from 'react';

const Send = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.txSend();
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
            value="Send"
            onClick={onClick}
        />
    );
};

Send.propTypes = {
    inProgress: PropTypes.bool.isRequired,
    memo: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    txSend: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.send.inProgress,
        memo: state.transactions.send.memo,
    };
};

const actionsToProps = {
    txSend,
};

export default connect(stateToProps, actionsToProps)(Send);
