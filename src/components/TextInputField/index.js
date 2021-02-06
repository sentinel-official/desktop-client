import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';
import Icon from '../Icon';
import TextBox from '../TextBox';

const TextInputField = ({
    className,
    name,
    placeholder,
    required,
    type,
    value,
    onChange,
}) => {
    const error = '';
    return (
        <>
            <input
                className={error ? `error ${className}` : className}
                name={name}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
                onChange={onChange}
            />
            <Icon
                className={error ? 'error show' : 'error'}
                icon="errorInfo"
            />
            <TextBox
                className="error-message"
                value="error"
            />

        </>

    );
};

TextInputField.propTypes = {
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextInputField;
