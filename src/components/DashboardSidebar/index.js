import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
import './index.css';

const DashboardSidebar = () => {
    return (
        <div>
            <ul className="list-group">
                <NavLink
                    className={window.location.pathname === '/dvpn' ? 'active' : ''}
                    to="/vpnDetails">
                    <Icon
                        className="icon"
                        icon="dvpn"
                    />
                    dVPN
                </NavLink>
                <NavLink
                    className={window.location.pathname === '/wallet' ? 'active' : ''}
                    to="/walletDetails">
                    <Icon
                        className="icon"
                        icon="wallet"
                    />
                    Wallet
                </NavLink>
            </ul>
        </div>
    );
};

export default DashboardSidebar;
