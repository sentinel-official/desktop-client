import React from 'react';
import DahboardSideBar from '../../components/DashboardSideBar';
import SettingsDropdown from '../../containers/Wallet/SettingsDropdown';
import { Tab, Tabs } from 'react-bootstrap';
import Validators from '../../containers/Wallet/Validators/Validators';
import TokenDetails from '../../containers/Wallet/TokenDetails';
import ValidatorState from '../../containers/Wallet/Validators/ValidatorState';
import Dropdown from '../../containers/Wallet/Validators/Dropdown';
import './index.css';

const Wallet = () => {
    return (
        <div className="wallet-section">
            <div className="dashboard-side-bar-container">
                <div className="settings-dropdown">
                    <SettingsDropdown/>
                </div>
                <div className="side-bar-list">
                    <DahboardSideBar/>
                </div>
            </div>
            <div className="wallet-details">
                <div className="middle-section col-md-4">
                    <p>Tokens</p>
                </div>
                <div className="wallet-tab col-md-8">
                    <TokenDetails/>
                    <div className="filter-section">
                        <ValidatorState/>
                        <Dropdown/>
                    </div>
                    <Tabs defaultActiveKey="Validators" id="uncontrolled-tab-example">
                        <Tab eventKey="Validators" title="Validators List">
                            <Validators/>
                        </Tab>
                        <Tab eventKey="Proposals" title="Proposals">
                            <p>empty</p>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
