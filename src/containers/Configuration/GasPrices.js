import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainGasPrices } from '../../actions/configuration';
import TextInputField from '../../components/TextInputField';
import { ValidateGasPrices } from './_validation';

const GasPrices = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: ValidateGasPrices(value),
        });
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="GasPrices"
            placeholder="Enter Gas Prices"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

GasPrices.propTypes = {
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
        input: state.configuration.chain.gasPrices,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainGasPrices,
};

export default connect(stateToProps, actionsToProps)(GasPrices);
