import * as PropTypes from 'prop-types';
import { ValidateAmount } from './_validation';
import { connect } from 'react-redux';
import { setTxRedelegateAmount } from '../../../../actions/transactions/redelegate';
import NumberInputField from '../../../../components/NumberInputField';
import React from 'react';

const Amount = (props) => {
    const onChange = ({ target: { value } }) => {
        value = parseFloat(value);

        props.onChange({
            value,
            error: ValidateAmount(value),
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
        input: state.transactions.redelegate.amount,
    };
};

const actionsToProps = {
    onChange: setTxRedelegateAmount,
};

export default connect(stateToProps, actionsToProps)(Amount);
