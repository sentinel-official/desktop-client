import * as PropTypes from 'prop-types';
import { ValidateMemo, ValidatePassword } from './_validation';
import { connect } from 'react-redux';
import { txVote } from '../../../../actions/transactions/vote';
import Button from '../../../../components/Button';
import React from 'react';

const Vote = (props) => {
    const onClick = () => {
    };

    const disabled = (
        ValidateMemo(props.memo.value).message !== '' ||
        ValidatePassword(props.password.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Vote"
            onClick={onClick}
        />
    );
};

Vote.propTypes = {
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
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.transactions.vote.inProgress,
        memo: state.transactions.vote.memo,
        password: state.account.password,
    };
};

const actionsToProps = {
    onClick: txVote,
};

export default connect(stateToProps, actionsToProps)(Vote);
