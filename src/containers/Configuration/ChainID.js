import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setConfigurationChainID } from '../../actions/configuration';
import TextInputField from '../../components/TextInputField';
import { ValidateID } from './_validation';

const ChainID = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();

        props.onChange({
            value,
            error: ValidateID(value),
        });
    };

    return (
        <TextInputField
            className="form-control"
            error={props.input.error}
            name="ChainID"
            placeholder="Enter Chain ID"
            required={true}
            type="text"
            value={props.input.value}
            onChange={onChange}
        />
    );
};

ChainID.propTypes = {
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
        input: state.configuration.chain.id,
    };
};

const actionsToProps = {
    onChange: setConfigurationChainID,
};

export default connect(stateToProps, actionsToProps)(ChainID);
