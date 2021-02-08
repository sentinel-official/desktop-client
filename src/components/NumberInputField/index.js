import * as PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import TextBox from '../TextBox';
import './index.css';

const NumberInputField = ({
    className,
    error,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
    min,
}) => {
    const isError = error.message.length > 0;

    return (
        <div>
            <input
                className={isError ? `error ${className}` : className}
                min={min}
                name={name}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
            />
            <div>
                <Icon
                    className={isError ? 'error show' : 'error'}
                    icon="errorInfo"
                />
                <TextBox
                    className="error-message"
                    value={error.message}
                />
            </div>
        </div>
    );
};

NumberInputField.propTypes = {
    className: PropTypes.string.isRequired,
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
    min: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default NumberInputField;
