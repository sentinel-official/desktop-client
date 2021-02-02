import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainFees } from '../../actions/configuration';
import InputField from '../../components/InputField';
import { ValidateFee } from './_validation';

const Fee = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: {
                message: ValidateFee(value).message,
            },
        });
    };

    return (
        <InputField
            className="form-control"
            name="Fee"
            placeholder="Enter Fee"
            required={true}
            type="text"
            value={props.value}
            onChange={onChange}
        />
    );
};

Fee.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.fees.value,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainFees,
};

export default connect(stateToProps, actionsToProps)(Fee);
