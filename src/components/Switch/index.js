import { Switch as MaterialSwitch } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Switch = (props) => {
    return (
        <MaterialSwitch
            checked={props.value}
            className="switch"
            color="primary"
            inputProps={props.inputProps}
            name={props.name}
            onChange={(e) => props.onChange(e.target.checked)}
        />
    );
};

Switch.propTypes = {
    inputProps: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Switch;
