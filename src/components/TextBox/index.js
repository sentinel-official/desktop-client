import './index.css';
import * as PropTypes from 'prop-types';
import React from 'react';

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

export default React.memo(TextBox);
