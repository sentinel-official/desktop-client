import './index.css';
import * as PropTypes from 'prop-types';
import Icon from '../Icon';
import React from 'react';
import TextBox from '../TextBox';

const TextInputField = ({
    className,
    error,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
}) => {
    const isError = error.message.length > 0;

    return (
        <>
            <input
                className={isError ? `error ${className}` : className}
                name={name}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
            />
            <Icon
                className={isError ? 'error show' : 'error'}
                icon="errorInfo"
            />
            <TextBox
                className="error-message"
                value={error.message}
            />
        </>
    );
};

TextInputField.propTypes = {
    className: PropTypes.string.isRequired,
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextInputField;
