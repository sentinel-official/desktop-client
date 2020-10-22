import React from 'react';
import './index.css';
import logo from '../../assets/logo192.png';

const Sidebar = () => {
    return (
        <div className="Sidebar">
            <div className="Sidebar-top">
                <img
                    alt="Sidebar Logo"
                    className="Sidebar-logo"
                    src={logo}/>
            </div>
            <div className="Sidebar-bottom">
                <div className="Sidebar-description">
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam”
                </div>
                <div className="Sidebar-brand">
                    SENTINEL
                </div>
                <div className="Sidebar-version">
                    v3.01.12
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
