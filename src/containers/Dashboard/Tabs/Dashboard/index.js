import React from 'react';
import Transactions from '../../../Transactions';
import './index.css';
import Wallet from './Wallet';

const Dashboard = () => {
    return (
        <div className="dashboard_content">
            <div className="row">
                <Wallet/>
            </div>
            <div className="row">
                <Transactions/>
            </div>
        </div>
    );
};

export default Dashboard;
