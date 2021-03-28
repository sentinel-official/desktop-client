import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showKeysCreateModal } from '../../../../actions/keys';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Create = ({ showKeysCreateModal }) => {
    const onClick = () => {
        showKeysCreateModal();
    };

    return (
        <Tooltip title="Create key">
            <IconButton
                aria-label="expand row"
                className="add-key-button"
                size="small"
                style={{ color: '#fff' }}
                onClick={onClick}>
                <AddIcon/>
            </IconButton>
        </Tooltip>
    );
};

Create.propTypes = {
    showKeysCreateModal: PropTypes.func.isRequired,
};

const actionsToProps = {
    showKeysCreateModal,
};

export default connect(null, actionsToProps)(Create);
