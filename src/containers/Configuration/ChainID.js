import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainID } from '../../actions/configuration';
import InputField from '../../components/InputField';
import { ValidateChainID } from './_validation';

const ChainID = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: {
                message: ValidateChainID(value).message,
            },
        });
    };

    return (
        <InputField
            className="form-control"
            name="ChainID"
            placeholder="Enter Chain ID"
            required={true}
            type="text"
            value={props.value}
            onChange={onChange}
        />
    );
};

ChainID.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.configuration.chain.id.value,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainID,
};

export default connect(stateToProps, actionsToProps)(ChainID);
