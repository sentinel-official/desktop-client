import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTxSendAmount } from '../../../actions/transactions/send';
import TextInputField from '../../../components/TextInputField';
import { ValidateAmount } from './_validation';

const Amount = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: {
                message: ValidateAmount(value).message,
            },
        });
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="Amount"
            placeholder="Enter Amount"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Amount.propTypes = {
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
        input: state.transactions.send.amount,
    };
};

const actionsToProps = {
    onChange: setTxSendAmount,
};

export default connect(stateToProps, actionsToProps)(Amount);
