import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const NumberInputField = ({
    className,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
    min,
}) => {
    return (
        <input
            className={className}
            min={min}
            name={name}
            placeholder={placeholder}
            required={required}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
};

NumberInputField.propTypes = {
    className: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default NumberInputField;
