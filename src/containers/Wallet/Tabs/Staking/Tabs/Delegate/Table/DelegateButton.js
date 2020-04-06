import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showDelegateDialog } from '../../../../../../../actions/delegate';
import variables from '../../../../../../../dummy/variables';

const DelegateButton = (props) => {
    const handleClick = () => {
        props.showDelegateDialog(props.value);
    };

    return (
        <Button
            className="active_button"
            variant="outlined"
            onClick={handleClick}>
            {variables[props.lang].delegate}
        </Button>
    );
};

DelegateButton.propTypes = {
    lang: PropTypes.string.isRequired,
    showDelegateDialog: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

const actionsToProps = {
    showDelegateDialog,
};

export default connect(stateToProps, actionsToProps)(DelegateButton);
