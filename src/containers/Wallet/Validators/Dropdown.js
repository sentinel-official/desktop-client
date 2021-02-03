import React from 'react';
import DropdownList from '../../../components/DropdownList';
import * as PropTypes from 'prop-types';

const config = {
    name: 'Delegate',
    options: [{
        label: 'Delegate',
    }, {
        label: 'Re-delegate',
    }, {
        label: 'Unbond',
    }],
};

const Dropdown = (props) => {
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
Dropdown.propTypes = {
    value: PropTypes.string.isRequired,
};
export default Dropdown;
