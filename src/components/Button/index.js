import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Button = (props) => {
    return (
        <button className={props.className}>
            {props.value}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default Button;
