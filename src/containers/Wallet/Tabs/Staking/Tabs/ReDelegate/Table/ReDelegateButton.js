import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showReDelegateDialog } from '../../../../../../../actions/reDelegate';
import variables from '../../../../../../../dummy/variables';

const ReDelegateButton = (props) => {
    const handleClick = () => {
        props.showDialog(props.value);
    };

    return (
        <Button
            className="active_button"
            variant="outlined"
            onClick={handleClick}>
            {variables[props.lang].re_delegate}
        </Button>
    );
};

ReDelegateButton.propTypes = {
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
    showDialog: showReDelegateDialog,
};

export default connect(stateToProps, actionsToProps)(ReDelegateButton);
