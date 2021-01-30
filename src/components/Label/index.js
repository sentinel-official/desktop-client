import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const Label = ({
    className,
    label,
}) => {
    return (
        <label className={className}>
            {label}
        </label>
    );
};

Label.propTypes = {
    className: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Label;
