import { Fab } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAccountCreationStep } from '../../../../actions/account';
import { addKeys, fetchKeys } from '../../../../actions/keys';
import variables from '../../../../dummy/variables';

const RecoveryButton = (props) => {
    return (
        <Fab
            aria-label="add"
            className="main_button create_account_button"
            color="primary"
            disabled={props.disable}
            variant="extended"
            onClick={props.onClick}>
            {variables[props.lang].recover_account}
        </Fab>
    );
};

RecoveryButton.propTypes = {
    disable: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

const actionsToProps = {
    onChange: setAccountCreationStep,
    addKeys,
    fetchKeys,
};

export default connect(stateToProps, actionsToProps)(RecoveryButton);
