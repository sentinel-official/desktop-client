import ReactProgressBar from '@ramonak/react-progress-bar';
import * as PropTypes from 'prop-types';
import React from 'react';
import './index.css';

const ProgressBar = ({ completed }) => {
    return (
        <div className="bar-container">
            <ReactProgressBar
                baseBgColor="rgba(18, 158, 237, 0.15)"
                bgcolor="#129EED"
                borderRadius="0px"
                completed={completed}
                height="1rem"
                isLableVisible={false}
            />
        </div>
    );
};

ProgressBar.propTypes = {
    completed: PropTypes.number.isRequired,
};

export default ProgressBar;
