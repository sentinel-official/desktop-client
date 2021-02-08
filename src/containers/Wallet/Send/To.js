import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTxSendTo } from '../../../actions/transactions/send';
import TextInputField from '../../../components/TextInputField';
import { ValidateTo } from './_validation';

const To = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: ValidateTo(value),
        });
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="To Address"
            placeholder="Enter Address"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

To.propTypes = {
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
        input: state.transactions.send.to,
    };
};

const actionsToProps = {
    onChange: setTxSendTo,
};

export default connect(stateToProps, actionsToProps)(To);
