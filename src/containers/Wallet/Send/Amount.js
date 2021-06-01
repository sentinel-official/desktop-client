import * as PropTypes from 'prop-types';
import { ValidateAmount } from './_validation';
import { connect } from 'react-redux';
import { floatCoin, validAmountFromInput } from '../../../utils/amount';
import { setTxSendAmount } from '../../../actions/transactions/send';
import NumberInputField from '../../../components/NumberInputField';
import React from 'react';

const Amount = (props) => {
    const amount = floatCoin(props.balance);

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
    balance: PropTypes.shape({
        denom: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    }).isRequired,
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
        balance: state.account.info.balance,
        input: state.transactions.send.amount,
    };
};

const actionsToProps = {
    onChange: setTxSendAmount,
};

export default connect(stateToProps, actionsToProps)(Amount);
