import * as PropTypes from 'prop-types';
import React from 'react';
import Dropdown from '../../components/Dropdown';

const config = {
    options: [
        {
            label: 'Test#1',
            icon: 'profile',
        },
        {
            label: 'settings',
            icon: 'setting',
        },
    ],
};

const Accounts = (props) => {
    const onClick = (event) => {
    };

    return (
        <Dropdown
            config={config}
            value={props.value}
            onClick={onClick}
        />
    );
};

Accounts.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Accounts;
