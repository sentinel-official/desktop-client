import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const TextArea = ({
    className,
    name,
    placeholder,
    required,
    rows,
    value,
    onChange,
}) => {
    return (
        <textarea
            className={className}
            name={name}
            placeholder={placeholder}
            required={required}
            rows={rows}
            value={value}
            onChange={onChange}
        />
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
