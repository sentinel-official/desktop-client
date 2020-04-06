import { CircularProgress as MaterialCircularProgress } from '@material-ui/core';
import React from 'react';
import './index.css';

function CircularProgress () {
    return (
        <div className="circular_progress">
            <MaterialCircularProgress/>
        </div>
    );
}

export default CircularProgress;
