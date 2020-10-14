import React from 'react';
import './index.css';

const Socials = (props) => {
    return (
        <div className={'socials'}>
            <div className='icon'>
                <a href="https://twitter.com/" target='_blank' rel='noopener noreferrer'>
                    <img src={process.env.PUBLIC_URL + 'icons/Twitter.svg'} alt='Twitter' />
                </a>
            </div>
            <div className='icon'>
                <a href="https://web.telegram.org/" target='_blank' rel='noopener noreferrer'>
                    <img src={process.env.PUBLIC_URL + 'icons/Telegram.svg'} alt='Telegram' />
                </a>
            </div>
            <div className='icon'>
                <a href="https://github.com/" target='_blank' rel='noopener noreferrer'>
                    <img src={process.env.PUBLIC_URL + 'icons/Github.svg'} alt='Github' />
                </a>
            </div>
        </div>
    );
};

export default Socials;
