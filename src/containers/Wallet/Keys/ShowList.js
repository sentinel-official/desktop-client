import * as PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showKeysListModal } from '../../../actions/keys';
import Icon from '../../../components/Icon';
import React from 'react';
import TextBox from '../../../components/TextBox';

const ShowList = ({ showKeysListModal }) => {
    const onClick = () => {
        showKeysListModal();
    };

    return (
        <Dropdown.Item
            key="viewKeys"
            title="Show keys"
            onClick={onClick}>
            <Icon
                className="icon"
                icon="keys"
            />
            <TextBox
                className="dropdown-item-text"
                value="Show keys"
            />
        </Dropdown.Item>
    );
};

ShowList.propTypes = {
    showKeysListModal: PropTypes.func.isRequired,
};

const actionsToProps = {
    showKeysListModal: showKeysListModal,
};

export default connect(null, actionsToProps)(ShowList);
