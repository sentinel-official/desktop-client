import * as PropTypes from 'prop-types';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import Icon from '../../../components/Icon';

const Settings = ({ onClick }) => {
    return (
        <Dropdown.Item
            key="settings"
            onClick={onClick}>
            <Icon
                className="icon"
                icon="setting"
            />
            {'Settings'}
        </Dropdown.Item>
    );
};

Settings.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const actionsToProps = {
    onClick: () => {
    },
};

export default connect({}, actionsToProps)(Settings);
