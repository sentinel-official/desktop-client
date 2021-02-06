import * as PropTypes from 'prop-types';
import React from 'react';
import Dropdown from '../../../components/Dropdown';

const options = [
    {
        label: 'Delegate',
        value: 'delegate',
    },
    {
        label: 'Redelegate',
        value: 'redelegate',
    },
    {
        label: 'Unbond',
        value: 'unbond',
    },
];

const Actions = (props) => {
    const onClick = (event) => {

    };

    return (
        <Dropdown
            index={0}
            options={options}
            onClick={onClick}
        />
    );
};

Actions.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Actions;
