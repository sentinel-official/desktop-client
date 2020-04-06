import { Slide, Snackbar as MaterialSnackbar } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const TransitionUp = (props) => <Slide direction="up" {...props}/>;

const Snackbar = (props) => {
    return (
        <MaterialSnackbar
            autoHideDuration={5000}
            className="snackbar"
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{props.message}</span>}
            open={props.open}
            TransitionComponent={TransitionUp}
            onClose={props.onClose}/>
    );
};

Snackbar.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Snackbar;
