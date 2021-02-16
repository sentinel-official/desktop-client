import './index.css';
import * as PropTypes from 'prop-types';
import { emptyFunc } from '../../constants/common';
import Icon from '../Icon';
import React from 'react';
import TextBox from '../TextBox';

const TextInputField = ({
    autofocus = false,
    className,
    error,
    name,
    placeholder,
    required = true,
    type = 'text',
    value,
    onChange,
    onKeyDown = emptyFunc,
}) => {
    const isError = error.message.length > 0;

    return (
        <>
            <input
                autoFocus={autofocus}
                className={isError ? `error ${className}` : className}
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

TextInputField.propTypes = {
    autofocus: PropTypes.bool.isRequired,
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
    onKeyDown: PropTypes.func.isRequired,
};

export default TextInputField;
