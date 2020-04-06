import { Fab } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import variables from '../../dummy/variables';

const CreateAccountButton = (props) => {
    return (
        <Fab
            aria-label="add"
            className="main_button create_account_button"
            color="primary"
            disabled={props.disable}
            variant="extended"
            onClick={props.onClick}>
            {variables[props.lang].create_an_account}
        </Fab>
    );
};

CreateAccountButton.propTypes = {
    disable: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(CreateAccountButton);
