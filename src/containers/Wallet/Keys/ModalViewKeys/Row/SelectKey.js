import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const SelectKey = () => {
    return (
        <Tooltip title="Select">
            <IconButton size="small">
                <CheckCircleIcon/>
            </IconButton>
        </Tooltip>
    );
};

export default SelectKey;
