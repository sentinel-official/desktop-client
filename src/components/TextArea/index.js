import './index.css';
import * as PropTypes from 'prop-types';
import Icon from '../Icon';
import React from 'react';
import TextBox from '../TextBox';

const TextArea = ({
    className,
    error,
    name,
    placeholder,
    required = true,
    rows,
    value,
    onChange,
}) => {
    const isError = error.message.length > 0;

    return (
        <>
            <textarea
                className={isError ? `error ${className}` : className}
                name={name}
                placeholder={placeholder}
                required={required}
                rows={rows}
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

TextArea.propTypes = {
    className: PropTypes.string.isRequired,
    error: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    rows: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextArea;
