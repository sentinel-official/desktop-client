import * as PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({
    checked,
    className,
    id,
    onChange,
}) => {
    return (
        <input
            checked={checked}
            className={className}
            id={id}
            type="checkbox"
            onChange={onChange}
        />
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
