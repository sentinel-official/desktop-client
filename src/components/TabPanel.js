import { Box, Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            aria-labelledby={`simple-tab-${index}`}
            component="div"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            role="tabpanel"
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
};

TabPanel.propTypes = {
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    children: PropTypes.node,
};

export default TabPanel;
