import React from 'react';
import DashboardSidebar from '../components/DashboardSidebar';

const config = {
    options: [
        {
            url: '/dvpn',
            icon: 'dvpn',
            name: 'dVPN',
        },
        {
            url: '/wallet',
            icon: 'wallet',
            name: 'Wallet',
        },
    ],
};
const Sidebar = () => {
    return (
        <DashboardSidebar
            config={config}
        />
    );
};

export default Sidebar;
