import React from 'react';
import WalletCards from '../../../../Dashboard/Tabs/Dashboard/Wallet/WalletCards';
import GoBack from './GoBack';
import './index.css';
import Tabs from './Tabs';

const Transaction = () => {
    return (
        <div className="wallet_transaction">
            <GoBack/>
            <div className="content">
                <WalletCards/>
                <Tabs/>
            </div>
        </div>
    );
};

export default Transaction;
