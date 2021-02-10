import './index.css';
import * as PropTypes from 'prop-types';
import React from 'react';

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

export default React.memo(Label);
