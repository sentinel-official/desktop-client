import React from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../Image';
import logo from '../../assets/Logo.svg';
import Icon from '../Icon';
import './index.css';
const DahboardSideBar = () => {
    return (
        <div className="side-bar">
            <ul className="list-group">
                <NavLink className={window.location.pathname === '/dvpn' ? 'active' : '' } to="/vpnDetails">
                    <Icon
                        className="icon"
                        icon="dvpn"
                    />
                    dvpn
                </NavLink>
                <NavLink className={window.location.pathname === '/wallet' ? 'active' : '' } to="/walletDetails">
                    <Icon
                        className="icon"
                        icon="wallet"
                    />
                    Wallet
                </NavLink>
            </ul>
            <div className="side-bar-footer">
                <Image
                    alt="logo"
                    className="side-bar-logo"
                    src={logo}
                />
            </div>
        </div>
    );
};

export default DahboardSideBar;
