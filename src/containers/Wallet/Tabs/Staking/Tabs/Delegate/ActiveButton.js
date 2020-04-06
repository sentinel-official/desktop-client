import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showActiveList } from '../../../../../../actions/delegate';
import { fetchActiveValidatorsList, setButtonSwitch } from '../../../../../../actions/staking';
import variables from '../../../../../../dummy/variables';

const ActiveButton = (props) => {
    const handleClick = () => {
        props.showActiveList();
        if (props.buttonSwitch) {
            props.fetchActiveList();
            props.setButtonSwitch(false);
        }
    };

    return (
        <Button
            className={props.activeList ? 'active_button' : 'outlined_button'}
            disabled={props.activeList}
            variant="outlined"
            onClick={handleClick}>
            {variables[props.lang].active}
        </Button>
    );
};

ActiveButton.propTypes = {
    activeList: PropTypes.bool.isRequired,
    buttonSwitch: PropTypes.bool.isRequired,
    fetchActiveList: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setButtonSwitch: PropTypes.func.isRequired,
    showActiveList: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        activeList: state.staking.delegate.activeList,
        buttonSwitch: state.staking.buttonSwitch,
        lang: state.language,
    };
};

const actionsToProps = {
    fetchActiveList: fetchActiveValidatorsList,
    showActiveList,
    setButtonSwitch,
};

export default connect(stateToProps, actionsToProps)(ActiveButton);
