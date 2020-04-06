import { Fab } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import variables from '../../dummy/variables';

const ContinueButton = (props) => {
    return (
        <Fab
            aria-label="add"
            className="main_button create_account_button"
            color="primary"
            disabled={!props.enable}
            variant="extended"
            onClick={props.onClick}>
            {variables[props.lang].continue}
        </Fab>
    );
};

ContinueButton.propTypes = {
    enable: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        enable: state.account.new.enable,
    };
};

export default withRouter(connect(stateToProps)(ContinueButton));
