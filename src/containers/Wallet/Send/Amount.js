import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTxSendAmount } from '../../../actions/transactions/send';
import NumberInputField from '../../../components/NumberInputField';
import { ValidateAmount } from './_validation';

const Amount = (props) => {
    const onChange = (event) => {
        const value = parseFloat(event.target.value.toString().trim());

        props.onChange({
            value,
            error: {
                message: ValidateAmount(value).message,
            },
        });
    };

    const value = props.input.value.toString();

    return (
        <NumberInputField
            className="form-control"
            error={props.input.error}
            min={0}
            name="Amount"
            placeholder="Enter Amount"
            required={true}
            type="number"
            value={value}
            onChange={onChange}
        />
    );
};

Amount.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.number.isRequired,
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
