import React from 'react';
import './index.css';
import { ReactComponent as TwitterLogo } from '../../assets/icons/Twitter.svg';
import { ReactComponent as TelegramLogo } from '../../assets/icons/Telegram.svg';
import { ReactComponent as GithubLogo } from '../../assets/icons/GitHub.svg';

const Socials = () => {
    return (
        <div className="Socials">
            <div className="Socials-icon">
                <a
                    href="https://twitter.com/"
                    rel="noopener noreferrer"
                    target="_blank">
                    <TwitterLogo/>
                </a>
            </div>
            <div className="Socials-icon">
                <a
                    href="https://web.telegram.org/"
                    rel="noopener noreferrer"
                    target="_blank">
                    <TelegramLogo/>
                </a>
            </div>
            <div className="Socials-icon">
                <a
                    href="https://github.com/"
                    rel="noopener noreferrer"
                    target="_blank">
                    <GithubLogo/>
                </a>
            </div>
        </div>
    );
};

export default Socials;
