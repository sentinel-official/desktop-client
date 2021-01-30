import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const ButtonChip = ({
    className,
    type,
    value,
    onClick,
}) => {
    const handleOnClick = () => onClick(value);
    return (
        <button
            className={className}
            type={type}
            onClick={handleOnClick}>
            {value}
        </button>
    );
};

ButtonChip.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ButtonChip;
