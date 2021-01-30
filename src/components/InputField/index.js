import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const InputField = ({
    className,
    label,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
}) => {
    return (
        <div className="form-group">
            <label>
                {label}
            </label>
            <input
                className={className}
                name={name}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

InputField.propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default InputField;
