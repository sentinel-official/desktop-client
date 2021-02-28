import { Dropdown } from 'react-bootstrap';
import Icon from '../../../components/Icon';
import React from 'react';
import TextBox from '../../../components/TextBox';

const ViewKeys = () => {
    const onClick = () => {
    };
    return (
        <Dropdown.Item
            key="viewKeys"
            title="view keys"
            onClick={onClick}>
            <Icon
                className="icon"
                icon="keys"
            />
            <TextBox
                className="dropdown-item-text"
                value="View Keys"
            />
        </Dropdown.Item>
    );
};

export default ViewKeys;
