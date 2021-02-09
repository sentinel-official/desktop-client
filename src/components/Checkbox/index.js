import * as PropTypes from 'prop-types';
import React from 'react';

const Checkbox = ({
    className,
}) => {
    return (
        <input
            className={className}
            id="customCheck"
            type="checkbox"
        />
    );
};

Checkbox.propTypes = {
    className: PropTypes.string.isRequired,
};

export default Checkbox;