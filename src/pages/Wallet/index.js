import React from 'react';
import DahboardSideBar from '../../components/DashboardSideBar';
import './index.css';

const Wallet = (props) => {
    return (
        <div className="wallet-section">
            <div className="dashboard-side-bar-container">
                <div className="settings-dropdown">
                    <p>dropdown</p>
                </div>
                <div className="side-bar-list">
                    <DahboardSideBar/>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
