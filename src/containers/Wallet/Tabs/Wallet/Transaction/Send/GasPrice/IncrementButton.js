import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setGasPriceIncrement } from '../../../../../../../actions/wallet';

const IncrementButton = (props) => {
    return (
        <Button className="increment_button" onClick={props.onChange}>
            +
        </Button>
    );
};

IncrementButton.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const actionsToProps = {
    onChange: setGasPriceIncrement,
};

export default connect(null, actionsToProps)(IncrementButton);
