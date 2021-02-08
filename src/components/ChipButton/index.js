import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const ChipButton = ({
    className,
    label,
    type,
    onClick,
}) => {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}>
            {label}
        </button>
    );
};

ChipButton.propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ChipButton;
