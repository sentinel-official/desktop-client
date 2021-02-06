import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';
import Icon from '../Icon';
import TextBox from '../TextBox';

const TextArea = ({
    className,
    name,
    placeholder,
    required,
    rows,
    value,
    onChange,
}) => {
    const error = '';
    return (
        <>
            <textarea
                className={error ? `error ${className}` : className }
                name={name}
                placeholder={placeholder}
                required={required}
                rows={rows}
                value={value}
                onChange={onChange}
            />
            <Icon
                className={error ? 'error show' : 'error' }
                icon="errorInfo"
            />
            <TextBox
                className="error-message"
                value="error"
            />
        </>

    );
};

TextArea.propTypes = {
    className: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    rows: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextArea;
