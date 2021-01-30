import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Button = ({
    className,
    disabled,
    value,
    onClick,
    loading,
}) => {
    return (
        <button
            className={className}
            disabled={disabled}
            onClick={onClick}>
            { loading
                ? <span
                    aria-hidden="true"
                    className="spinner-border spinner-border-sm"
                    role="status">
                </span>
                : value
            }
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;
