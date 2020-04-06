import React from 'react';
import loader from '../../assets/sentinel_splash.gif';
import './index.css';

const SplashScreen = () => {
    return (
        <div className="splash">
            <img alt="Sentinel Logo" src={loader}/>
        </div>
    );
};

export default SplashScreen;
