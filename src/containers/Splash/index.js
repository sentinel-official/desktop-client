import * as PropTypes from 'prop-types';
import React from 'react';
import LogoWithText from '../../assets/LogoWithText.svg';
import Image from '../../components/Image';
import TextBox from '../../components/TextBox';
import ProgressBar from './ProgressBar';

const Splash = ({ history }) => {
    return (
        <div className="splash-container">
            <Image
                alt="LogoWithText"
                className="w-200"
                src={LogoWithText}
            />
            <TextBox
                className="splash-text f-14 fw-600"
                value="PREPARING THE SENTINEL CLIENT"
            />
            <ProgressBar history={history}/>
        </div>
    );
};

Splash.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Splash;
