import React from 'react';
import './index.css';

const SideLogo = () => {
    return (
        <div className='sideBar'>
            <div className='Top'>
                <img className="sideLogoImg" src={process.env.PUBLIC_URL + '/logo192.png'} alt="Side Logo"/>
            </div>
            <div className="Bottom">
                <div className="sideBarText">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam”
                </div>
                <div className="sideBarBrand">
                    S E N T I N E L
                </div>
                <div className="sideBarVersion">
                    v3.01.12
                </div>
            </div>
        </div>
    );
};

export default SideLogo;
