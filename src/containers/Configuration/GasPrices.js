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
            error: {
                message: ValidateGasPrices(value).message,
            },
        });
    };

    return (
        <TextInputField
            className="form-control"
            name="GasPrices"
            placeholder="Enter Gas Prices"
            required={true}
            type="text"
            value={props.value}
            onChange={onChange}
        />
    );
};

GasPrices.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.gasPrices.value,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainGasPrices,
};

export default connect(stateToProps, actionsToProps)(GasPrices);
