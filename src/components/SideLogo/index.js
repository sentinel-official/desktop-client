import React from 'react';
import './index.css';
import logo from '../../assets/logo192.png';

const SideLogo = () => {
    return (
        <div className="sideBar">
            <div className="Top">
                <img
                    alt="Side Logo"
                    className="sideLogoImg"
                    src={logo}/>
            </div>
            <div className="Bottom">
                <div className="sideBarText">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam”
                </div>
                <div className="sideBarBrand">
                    SENTINEL
                </div>
                <div className="sideBarVersion">
                    v3.01.12
                </div>
            </div>
        </div>
    );
};

export default SideLogo;
