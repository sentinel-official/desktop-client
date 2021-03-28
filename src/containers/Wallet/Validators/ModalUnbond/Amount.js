import * as PropTypes from 'prop-types';
import { ValidateAmount } from './_validation';
import { connect } from 'react-redux';
import { setTxUnbondAmount } from '../../../../actions/transactions/unbond';
import { validAmountFromInput } from '../../../../utils/amount';
import BigNumber from '../../../../utils/bignumber';
import NumberInputField from '../../../../components/NumberInputField';
import React from 'react';

const Amount = (props) => {
    const amount = new BigNumber(Infinity);

    const onChange = ({ target: { value } }) => {
        value = validAmountFromInput(amount, props.input.value, value);
        if (value === undefined) {
            return;
        }

        props.onChange({
            value,
            error: ValidateAmount(value),
        });
    };

    return (
        <NumberInputField
            className="form-control"
            error={props.input.error}
            min={0}
            name="Amount"
            placeholder="Enter Amount"
            required={true}
            type="number"
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
        input: state.transactions.unbond.amount,
    };
};

const actionsToProps = {
    onChange: setTxUnbondAmount,
};

export default connect(stateToProps, actionsToProps)(Amount);
