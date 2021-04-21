import * as PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({
    checked,
    className,
    onChange,
}) => {
    return (
        <input
            checked={checked}
            className={className}
            type="checkbox"
            onChange={onChange}
        />
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
