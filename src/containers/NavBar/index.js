import React from 'react';
import Faucet from './Faucet';
import './index.css';
import Profile from './Profile';
import QuickTransact from './QuickTransact';
import RefreshButton from './RefreshButton';

const NavBar = () => {
    return (
        <div className="nav_bar">
            <RefreshButton/>
            <Faucet/>
            <QuickTransact/>
            <Profile/>
        </div>
    );
};

export default NavBar;
