import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const TextBox = ({
    className,
    value,
}) => {
    return (
        <p className={className}>
            {value}
        </p>
    );
};

TextBox.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default TextBox;
