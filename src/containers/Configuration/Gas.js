import * as PropTypes from 'prop-types';
import { ValidateGas } from './_validation';
import { connect } from 'react-redux';
import { setConfigurationChainGas } from '../../actions/configuration';
import NumberInputField from '../../components/NumberInputField';
import React from 'react';

const Gas = (props) => {
    const onChange = ({ target: { value } }) => {
        value = parseInt(value.toString().trim());

        props.onChange({
            value,
            error: ValidateGas(value),
        });
    };

    const value = props.input.value.toString();

    return (
        <NumberInputField
            className="form-control"
            error={props.input.error}
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
        input: state.configuration.chain.gas,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainGas,
};

export default connect(stateToProps, actionsToProps)(Gas);
