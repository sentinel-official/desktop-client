import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const InputField = ({
    className,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
    minimum,
}) => {
    return (
        <input
            className={className}
            min={minimum}
            name={name}
            placeholder={placeholder}
            required={required}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
};

InputField.propTypes = {
    className: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default InputField;
