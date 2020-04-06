import React from 'react';
import '../../../Dashboard/Tabs/Dashboard/Wallet/index.css';
import Transactions from '../../../Transactions';
import './index.css';
import Wallet from './Wallet';

const MyWallets = () => {
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

export default MyWallets;
