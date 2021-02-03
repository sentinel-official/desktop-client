import React from 'react';
import DropdownList from '../../components/DropdownList';
import * as PropTypes from 'prop-types';

const config = {
    options: [{
        label: 'Test#1',
        icon: 'profile',
    }, {
        label: 'settings',
        icon: 'setting',
    }],
};

const SettingsDropdown = (props) => {
    const onClick = (event) => {
    };
    return (
        <DropdownList
            config={config}
            value={props.value}
            onClick={onClick}
        />
    );
};

SettingsDropdown.propTypes = {
    value: PropTypes.string.isRequired,
};

export default SettingsDropdown;
