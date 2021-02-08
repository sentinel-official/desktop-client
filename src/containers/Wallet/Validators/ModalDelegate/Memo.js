import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTxDelegateMemo } from '../../../../actions/transactions/delegate';
import TextArea from '../../../../components/TextArea';
import { ValidateMemo } from './_validation';

const Memo = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: ValidateMemo(value),
        });
    };

    return (
        <TextArea
            className="form-control seed-text-field"
            error={props.input.error}
            name="Memo"
            placeholder="Enter Memo"
            required={true}
            rows={3}
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Memo.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        error: PropTypes.shape({
            message: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        input: state.transactions.delegate.memo,
    };
};

const actionsToProps = {
    onChange: setTxDelegateMemo,
};

export default connect(stateToProps, actionsToProps)(Memo);
