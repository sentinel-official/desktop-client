import * as PropTypes from 'prop-types';
import { ValidateID } from './_validation';
import { connect } from 'react-redux';
import { setConfigurationChainID } from '../../actions/configuration';
import React from 'react';
import TextInputField from '../../components/TextInputField';

const ChainID = (props) => {
    const onChange = ({ target: { value } }) => {
        value = value.toString();

        props.onChange({
            value,
            error: ValidateID(value),
        });
    };

    return (
        <TextInputField
            autofocus={false}
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
