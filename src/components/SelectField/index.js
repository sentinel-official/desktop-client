import './index.css';
import * as PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';

const SelectField = ({
    className,
    items,
    menuItemClassName,
    value,
    onChange,
}) => {
    return (
        <Select
            className={className}
            displayEmpty={true}
            value={value}
            onChange={onChange}>
            <MenuItem
                key={0}
                className={menuItemClassName}
                value="">
                {'None'}
            </MenuItem>
            {
                items.map((item, index) => (
                    <MenuItem
                        key={index + 1}
                        className={menuItemClassName}
                        value={item['operator_address']}>
                        {item.description.moniker}
                    </MenuItem>
                ))
            }
            {
                items.length > 1 && (
                    <MenuItem
                        key={-1}
                        className={menuItemClassName}
                        value="All">
                        All
                    </MenuItem>
                )
            }
        </Select>
    );
};

SelectField.propTypes = {
    className: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    menuItemClassName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SelectField;
