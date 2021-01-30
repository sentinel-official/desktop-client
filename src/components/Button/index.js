import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Button = ({
    className,
    disabled,
    value,
    onClick,
}) => {
    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}>
            {value}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
