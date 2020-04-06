import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showUnBondDialog } from '../../../../../../../actions/unBond';
import variables from '../../../../../../../dummy/variables';

const UnBondButton = (props) => {
    const handleClick = () => {
        props.showDialog(props.value);
    };

    return (
        <Button
            className="active_button"
            variant="outlined"
            onClick={handleClick}>
            {variables[props.lang].un_bond}
        </Button>
    );
};

UnBondButton.propTypes = {
    lang: PropTypes.string.isRequired,
    showDialog: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

const actionsToProps = {
    showDialog: showUnBondDialog,
};

export default connect(stateToProps, actionsToProps)(UnBondButton);
