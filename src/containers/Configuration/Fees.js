import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainFees } from '../../actions/configuration';
import TextInputField from '../../components/TextInputField';
import { ValidateFees } from './_validation';

const Fees = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: {
                message: ValidateFees(value).message,
            },
        });
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="Fee"
            placeholder="Enter Fee"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Fees.propTypes = {
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
        input: state.configuration.chain.fees,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainFees,
};

export default connect(stateToProps, actionsToProps)(Fees);