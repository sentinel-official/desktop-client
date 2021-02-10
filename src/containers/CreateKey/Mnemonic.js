import * as PropTypes from 'prop-types';
import { ValidateMnemonic } from './_validation';
import { connect } from 'react-redux';
import { setKeyMnemonic } from '../../actions/keys';
import React from 'react';
import TextArea from '../../components/TextArea';

const Mnemonic = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();
        props.onChange({
            value,
            error: ValidateMnemonic(value),
        });
    };

    return (
        <TextArea
            className="form-control seed-text-field"
            error={props.input.error}
            name="mnemonic"
            placeholder="Enter Mnemonic"
            required={true}
            rows={3}
            value={props.input.value}
            onChange={onChange}
        />
    );
};

Mnemonic.propTypes = {
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
        input: state.keys.post.mnemonic,
    };
};

const actionsToProps = {
    onChange: setKeyMnemonic,
};

export default connect(stateToProps, actionsToProps)(Mnemonic);
