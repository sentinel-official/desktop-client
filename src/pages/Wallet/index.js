import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Logo from '../../assets/Logo.svg';
import DashboardSidebar from '../../components/DashboardSidebar';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Label from '../../components/Label';
import TextBox from '../../components/TextBox';
import Address from '../../containers/SendRecieve/Receive/Address';
import CopyAddress from '../../containers/SendRecieve/Receive/CopyAddress';
import QRCode from '../../containers/SendRecieve/Receive/QRCode';
import Amount from '../../containers/SendRecieve/Send/Amount';
import Send from '../../containers/SendRecieve/Send/Send';
import DepositAddress from '../../containers/SendRecieve/Send/To';
import WithDrawValidators from '../../containers/SendRecieve/WithDraw/Validators';
import WithDraw from '../../containers/SendRecieve/WithDraw/WithDraw';
import Accounts from '../../containers/Wallet/Accounts';
import Tokens from '../../containers/Wallet/Tokens';
import Actions from '../../containers/Wallet/Validators/Actions';
import Validators from '../../containers/Wallet/Validators/Validators';
import ValidatorState from '../../containers/Wallet/Validators/ValidatorState';
import './index.css';

const Wallet = () => {
    return (
        <div className="wallet-section">
            <div className="dashboard-side-bar-container">
                <div className="settings-dropdown">
                    <Accounts/>
                </div>
                <div className="side-bar-list">
                    <DashboardSidebar/>
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
                                <DepositAddress/>
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
                                <WithDrawValidators/>
                            </div>
                            <WithDraw/>
                        </div>
                    </div>

                </div>
                <div className="wallet-tab col-md-8">
                    <Tokens/>
                    <div className="filter-section">
                        <ValidatorState/>
                        <Actions/>
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
