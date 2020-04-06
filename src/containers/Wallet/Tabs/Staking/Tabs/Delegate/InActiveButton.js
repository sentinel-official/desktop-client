import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { hideActiveList } from '../../../../../../actions/delegate';
import { fetchInActiveValidatorsList, setButtonSwitch } from '../../../../../../actions/staking';
import variables from '../../../../../../dummy/variables';

const InActiveButton = (props) => {
    const handleClick = () => {
        props.hideActiveList();
        if (props.buttonSwitch) {
            props.fetchInActiveList();
            props.setButtonSwitch(false);
        }
    };

    return (
        <Button
            className={!props.activeList ? 'active_button' : 'outlined_button'}
            disabled={!props.activeList}
            variant="outlined"
            onClick={handleClick}>
            {variables[props.lang].in_active}
        </Button>
    );
};

InActiveButton.propTypes = {
    activeList: PropTypes.bool.isRequired,
    buttonSwitch: PropTypes.bool.isRequired,
    fetchInActiveList: PropTypes.func.isRequired,
    hideActiveList: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setButtonSwitch: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        activeList: state.staking.delegate.activeList,
        buttonSwitch: state.staking.buttonSwitch,
        lang: state.language,
    };
};

const actionsToProps = {
    fetchInActiveList: fetchInActiveValidatorsList,
    setButtonSwitch,
    hideActiveList,
};

export default connect(stateToProps, actionsToProps)(InActiveButton);
