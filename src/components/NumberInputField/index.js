import './index.css';
import * as PropTypes from 'prop-types';
import { numberInputInvalidKeyCodes, numberInputInvalidKeys } from '../../constants/common';
import Icon from '../Icon';
import React from 'react';
import TextBox from '../TextBox';

const NumberInputField = ({
    className,
    error,
    name,
    placeholder,
    required = true,
    type = 'number',
    value,
    onChange,
    min,
}) => {
    const onKeyDown = (event) => {
        const prevent = (
            numberInputInvalidKeys.includes(event.key) ||
            numberInputInvalidKeyCodes.includes(event.keyCode)
        );

        if (prevent) {
            event.preventDefault();
        }
    };

    const isError = error.message.length > 0;

    return (
        <>
            <input
                className={isError ? `error ${className}` : className}
                min={min}
                name={name}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
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
