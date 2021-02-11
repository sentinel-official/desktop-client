import * as PropTypes from 'prop-types';
import { ValidateToAddress } from './_validation';
import { connect } from 'react-redux';
import { setTxRedelegateTo } from '../../../../actions/transactions/redelegate';
import React from 'react';
import TextInputField from '../../../../components/TextInputField';

const ToAddress = (props) => {
    const onChange = ({ target: { value } }) => {
        value = value.toString();

        props.onChange({
            value,
            error: ValidateToAddress(value),
        });
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="To"
            placeholder="Enter Address"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

ToAddress.propTypes = {
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
        input: state.transactions.redelegate.to,
    };
};

const actionsToProps = {
    onChange: setTxRedelegateTo,
};

export default connect(stateToProps, actionsToProps)(ToAddress);
