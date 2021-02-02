import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainRPCAddress } from '../../actions/configuration';
import InputField from '../../components/InputField';
import { ValidateRPCAddress } from './_validation';

const RPCAddress = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: {
                message: ValidateRPCAddress(value).message,
            },
        });
    };

    return (
        <InputField
            className="form-control"
            name="RPCAddress"
            placeholder="Enter RPC Address"
            required={true}
            type="text"
            value={props.value}
            onChange={onChange}
        />
    );
};

RPCAddress.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.RPCAddress.value,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainRPCAddress,
};

export default connect(stateToProps, actionsToProps)(RPCAddress);
