import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setGasPriceDecrement } from '../../../../../../../actions/wallet';

const DecrementButton = (props) => {
    return (
        <Button className="decrement_button" onClick={props.onChange}>
            -
        </Button>
    );
};

DecrementButton.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const actionsToProps = {
    onChange: setGasPriceDecrement,
};

export default connect(null, actionsToProps)(DecrementButton);
