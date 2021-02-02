import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainGas } from '../../actions/configuration';
import NumberInputField from '../../components/NumberInputField';
import { ValidateGas } from './_validation';

const Gas = (props) => {
    const onChange = (event) => {
        const value = parseInt(event.target.value.toString().trim());

        props.onChange({
            value,
            error: {
                message: ValidateGas(value).message,
            },
        });
    };

    const value = props.value.toString();

    return (
        <NumberInputField
            className="form-control"
            min={0}
            name="gas"
            placeholder="Enter Gas"
            required={true}
            type="number"
            value={value}
            onChange={onChange}
        />
    );
};

Gas.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.gas.value,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainGas,
};

export default connect(stateToProps, actionsToProps)(Gas);
