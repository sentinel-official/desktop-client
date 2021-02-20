import * as PropTypes from 'prop-types';
import { SPLASH_TIMEOUT } from '../../constants/splash';
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import ReactProgressBar from '../../components/ProgressBar';

const ProgressBar = (props) => {
    useEffect(() => {
        if (props.completed === 150) {
            setTimeout(() => {
                props.history.push('/dashboard/wallet');
            }, SPLASH_TIMEOUT);
        }
    });

    return (
        <ReactProgressBar completed={props.completed}/>
    );
};

ProgressBar.propTypes = {
    completed: PropTypes.number.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

const stateToProps = (state) => {
    return {
        completed: state.splash.completed,
    };
};

export default connect(stateToProps)(ProgressBar);
