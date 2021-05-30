import './index.css';
import * as PropTypes from 'prop-types';
import { Slide, Snackbar as MaterialSnackbar } from '@material-ui/core';
import React from 'react';

const TransitionUp = (props) => {
    return <Slide direction="down" {...props}/>;
};

const Snackbar = ({
    message,
    open,
    onClose,
}) => {
    return (
        <MaterialSnackbar
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            TransitionComponent={TransitionUp}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={5000}
            className="snackbar"
            message={<span id="message-id">{message}</span>}
            open={open}
            onClose={onClose}
        />
    );
};

Snackbar.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Snackbar;
