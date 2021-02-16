import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Add = () => {
    const onClick = () => {
    };
    return (
        <Tooltip title="Add key">
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

export default Add;
