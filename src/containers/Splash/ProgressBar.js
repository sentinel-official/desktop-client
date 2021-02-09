import * as PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setSplashCompleted } from '../../actions/splash';
import ReactProgressBar from '../../components/ProgressBar';
import { SPLASH_TIMEOUT } from '../../constants/splash';

const ProgressBar = (props) => {
    useEffect(() => {
        if (props.completed >= 100) {
            setTimeout(() => {
                props.history.push('/dashboard/wallet');
            }, SPLASH_TIMEOUT);
            return;
        }

        setTimeout(() => {
            props.setCompleted(props.completed + 50);
        }, SPLASH_TIMEOUT);
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
    setCompleted: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        completed: state.splash.completed,
    };
};

const actionsToProps = {
    setCompleted: setSplashCompleted,
};

export default connect(stateToProps, actionsToProps)(ProgressBar);
