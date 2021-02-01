import React from 'react';
import Icon from '../Icon';
import './index.css';

const SocialIcons = () => {
    return (
        <div className="social-icons">
            <a href="https://twitter.com/sentinel_co?lang=en" rel="noreferrer" target="_blank">
                <Icon
                    className="icon"
                    icon="twitter"
                />
            </a>
            <a href="http://t.me/sentinel_co" rel="noreferrer" target="_blank">
                <Icon
                    className="icon"
                    icon="telegram"
                />
            </a>
            <a href="https://github.com/sentinel-official" rel="noreferrer" target="_blank">
                <Icon
                    className="icon"
                    icon="github"
                />
            </a>
        </div>
    );
};

export default SocialIcons;
