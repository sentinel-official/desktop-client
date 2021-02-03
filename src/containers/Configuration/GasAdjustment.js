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
            error: {
                message: ValidateGasAdjustment(value).message,
            },
        });
    };

    const value = props.value.toString();

    return (
        <NumberInputField
            className="form-control"
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
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.gasAdjustment.value,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainGasAdjustment,
};

export default connect(stateToProps, actionsToProps)(GasAdjustment);
