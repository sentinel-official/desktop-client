import * as PropTypes from 'prop-types';
import React from 'react';
import Dropdown from '../../../components/Dropdown';

const config = {
    name: 'Delegate',
    options: [
        {
            label: 'Delegate',
        },
        {
            label: 'Redelegate',
        },
        {
            label: 'Unbond',
        },
    ],
};

const Actions = (props) => {
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

Actions.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Actions;
