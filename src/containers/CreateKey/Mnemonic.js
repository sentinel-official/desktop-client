import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setKeyMnemonic } from '../../actions/keys';
import TextArea from '../../components/TextArea';
import { ValidateMnemonic } from './_validation';

const Mnemonic = (props) => {
    const onChange = (event) => {
        const value = event.target.value.toString();
        props.onChange({
            value,
            error: {
                message: ValidateMnemonic(value).message,
            },
        });
    };

    return (
        <TextArea
            className="form-control seed-text-field"
            name="mnemonic"
            placeholder="Enter Mnemonic"
            required={true}
            rows={3}
            value={props.value}
            onChange={onChange}
        />
    );
};

Mnemonic.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.keys.post.mnemonic.value,
    };
};

const actionsToProps = {
    onChange: setKeyMnemonic,
};

export default connect(stateToProps, actionsToProps)(Mnemonic);
