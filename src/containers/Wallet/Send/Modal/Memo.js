import * as PropTypes from 'prop-types';
import { ValidateMemo } from './_validation';
import { connect } from 'react-redux';
import { setTxSendMemo } from '../../../../actions/transactions/send';
import React from 'react';
import TextArea from '../../../../components/TextArea';

const Memo = (props) => {
    const onChange = ({ target: { value } }) => {
        value = value.toString();

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
        input: state.transactions.send.memo,
    };
};

const actionsToProps = {
    onChange: setTxSendMemo,
};

export default connect(stateToProps, actionsToProps)(Memo);
