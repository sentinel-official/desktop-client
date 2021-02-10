import './index.css';
import * as PropTypes from 'prop-types';
import React from 'react';

const Spinner = () => {
    return (
        <span
            aria-hidden="true"
            className="spinner-border spinner-border-sm"
            role="status">
        </span>
    );
};

const Button = ({
    className,
    disabled,
    value,
    onClick,
    inProgress,
}) => {
    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}>
            {
                inProgress ? <Spinner/> : value
            }
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    inProgress: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
