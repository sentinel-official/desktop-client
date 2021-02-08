import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const SelectField = ({
    className,
    list,
    onChange,
}) => {
    return (
        <select
            className={className}
            onChange={onChange}>
            {
                list.map((item, index) => (
                    <option key={index}>
                        {item.value} ({item.address})
                    </option>
                ))
            }
        </select>
    );
};

SelectField.propTypes = {
    className: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectField;
