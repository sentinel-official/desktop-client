import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const ChipButton = ({
    className,
    type,
    value,
    onClick,
}) => {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}>
            {value}
        </button>
    );
};

ChipButton.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ChipButton;
