import * as PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showConfigurationModal } from '../../../actions/configuration';
import Icon from '../../../components/Icon';
import React from 'react';
import TextBox from '../../../components/TextBox';

const Settings = ({ onClick }) => {
    return (
        <Dropdown.Item
            key="settings"
            title="settings"
            onClick={onClick}>
            <Icon
                className="icon"
                icon="setting"
            />
            <TextBox
                className="dropdown-item-text"
                value="Settings"
            />
        </Dropdown.Item>
    );
};

Settings.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const actionsToProps = {
    onClick: showConfigurationModal,
};

export default connect(null, actionsToProps)(Settings);
