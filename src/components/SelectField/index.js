import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const SelectField = ({
    className,
    items,
    onChange,
}) => {
    return (
        <select
            className={className}
            onChange={onChange}>
            {
                items.map((item, index) => (
                    <option key={index}>
                        {item.description.moniker} ({item.address})
                    </option>
                ))
            }
        </select>
    );
};

SelectField.propTypes = {
    className: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectField;
