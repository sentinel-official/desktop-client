import { Fab } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAccountCreationStep } from '../../actions/account';
import variables from '../../dummy/variables';

const ContinueButton = (props) => {
    return (
        <Fab
            aria-label="add"
            className="main_button create_account_button"
            color="primary"
            variant="extended"
            onClick={() => props.onChange(3)}>
            {variables[props.lang].continue}
        </Fab>
    );
};

ContinueButton.propTypes = {
    lang: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

const actionsToProps = {
    onChange: setAccountCreationStep,
};

export default connect(stateToProps, actionsToProps)(ContinueButton);
