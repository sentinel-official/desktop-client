import * as PropTypes from 'prop-types';
import { ValidateRPCAddress } from './_validation';
import { connect } from 'react-redux';
import { setConfigurationChainRPCAddress } from '../../actions/configuration';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const RPCAddress = (props) => {
    const onChange = ({ target: { value } }) => {
        value = value.toString();

        props.onChange({
            value,
            error: ValidateRPCAddress(value),
        });
    };

    return (
        <TextInputField
            autofocus={false}
            className="form-control"
            error={props.input.error}
            name="RPCAddress"
            placeholder="Enter RPC Address"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

RPCAddress.propTypes = {
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
        input: state.configuration.chain.RPCAddress,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainRPCAddress,
};

export default connect(stateToProps, actionsToProps)(RPCAddress);
