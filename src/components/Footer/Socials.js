import React from 'react';
import './index.css';

const Socials = (props) => {
    return (
        <div className={'socials'}>
            <div className="icon">
                <a href="https://twitter.com/" rel="noopener noreferrer" target="_blank">
                    <img alt="Twitter" src={process.env.PUBLIC_URL + 'icons/Twitter.svg'} />
                </a>
            </div>
            <div className="icon">
                <a href="https://web.telegram.org/" rel="noopener noreferrer" target="_blank">
                    <img alt="Telegram" src={process.env.PUBLIC_URL + 'icons/Telegram.svg'} />
                </a>
            </div>
            <div className="icon">
                <a href="https://github.com/" rel="noopener noreferrer" target="_blank">
                    <img alt="Github" src={process.env.PUBLIC_URL + 'icons/Github.svg'} />
                </a>
            </div>
        </div>
    );
};

export default Socials;
