import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const SelectField = ({
    className,
    items,
    value,
    onChange,
}) => {
    return (
        <select
            className={className}
            value={value}
            onChange={onChange}>
            <option
                key={0}
                value="">
                {'None'}
            </option>
            {
                items.map((item, index) => (
                    <option
                        key={index + 1}
                        value={item.address}>
                        {item.description.moniker}
                    </option>
                ))
            }
        </select>
    );
};

SelectField.propTypes = {
    className: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectField;
