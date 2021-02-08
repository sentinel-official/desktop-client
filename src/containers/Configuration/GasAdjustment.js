import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainGasAdjustment } from '../../actions/configuration';
import NumberInputField from '../../components/NumberInputField';
import { ValidateGasAdjustment } from './_validation';

const GasAdjustment = (props) => {
    const onChange = (event) => {
        const value = parseFloat(event.target.value.toString().trim());

        props.onChange({
            value,
            error: ValidateGasAdjustment(value),
        });
    };

    const value = props.input.value.toString();

    return (
        <NumberInputField
            className="form-control"
            error={props.input.error}
            min={0}
            name="GasAdjustment"
            placeholder="Enter Gas Adjustment"
            required={true}
            type="number"
            value={value}
            onChange={onChange}
        />
    );
};

GasAdjustment.propTypes = {
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
        input: state.configuration.chain.gasAdjustment,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainGasAdjustment,
};

export default connect(stateToProps, actionsToProps)(GasAdjustment);
