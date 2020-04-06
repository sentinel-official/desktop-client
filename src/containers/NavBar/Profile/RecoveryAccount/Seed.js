import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setSeed } from '../../../../actions/navbar';
import TextField from '../../../../components/TextField';
import variables from '../../../../dummy/variables';

const SeedTextField = (props) => {
    return (
        <TextField
            id="recovery_seed_text_field"
            name="recoverySeed"
            placeholder={variables[props.lang].enter_seed}
            type="text"
            value={props.value}
            onChange={props.onChange}/>
    );
};

SeedTextField.propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.navBar.recoveryAccount.seed,
    };
};

const actionsToProps = {
    onChange: setSeed,
};

export default connect(stateToProps, actionsToProps)(SeedTextField);
