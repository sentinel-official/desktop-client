import React from 'react';
import DahboardSideBar from '../../components/DashboardSideBar';
import SettingsDropdown from '../../containers/Wallet/SettingsDropdown';
import { Tab, Tabs } from 'react-bootstrap';
import Validators from '../../containers/Wallet/Validators/Validators';
import TokenDetails from '../../containers/Wallet/TokenDetails';
import ValidatorState from '../../containers/Wallet/Validators/ValidatorState';
import Dropdown from '../../containers/Wallet/Validators/Dropdown';
import Amount from '../../containers/SendRecieve/Send/Amount';
import DepositeAddress from '../../containers/SendRecieve/Send/DepositeAddress';
import Send from '../../containers/SendRecieve/Send/Send';
import QRCode from '../../containers/SendRecieve/Receive/QRCode';
import Address from '../../containers/SendRecieve/Receive/Address';
import CopyAddress from '../../containers/SendRecieve/Receive/CopyAddress';
import SelectValidator from '../../containers/SendRecieve/WithDraw/SelectValidator';
import WithDraw from '../../containers/SendRecieve/WithDraw/WithDraw';
import './index.css';
import Label from '../../components/Label';
import TextBox from '../../components/TextBox';
import Logo from '../../assets/Logo.svg';
import Image from '../../components/Image';
import Icon from '../../components/Icon';

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
                    <div className="top-section">
                        <TextBox className="sentinel-text" value="Tokens"/>
                        <div className="logo-box">
                            <div className="left">
                                <div className="logo">
                                    <Image alt="Logo" className="" src={Logo}/>
                                </div>
                                <TextBox className="sentinel-text" value="Sentinel"/>
                                <TextBox className="sub-text" value="(sent)"/>
                            </div>
                            <Icon
                                className="icon"
                                icon="success"
                            />
                        </div>
                    </div>
                    <Tabs defaultActiveKey="send">
                        <Tab eventKey="send" title="send">
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Deposit Address"
                                />
                                <DepositeAddress/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="amount"
                                />
                                <Amount/>
                            </div>
                            <Send/>
                        </Tab>
                        <Tab eventKey="Receive" title="Receive">
                            <TextBox className="qr-title" value="Show QR code to Receive Tokens"/>
                            <QRCode/>
                            <div className="copy-address">
                                <TextBox className="" value="Address"/>
                                <CopyAddress/>
                            </div>
                            <Address/>
                        </Tab>
                    </Tabs>
                    <div className="withdraw-section">
                        <TextBox className="title" value="Withdraw"/>
                        <div className="withdraw-section-content">
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Select Validator to Withdraw"
                                />
                                <SelectValidator/>
                            </div>
                            <WithDraw/>
                        </div>
                    </div>

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
