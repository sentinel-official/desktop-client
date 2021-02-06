import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import collapse from '../../assets/collapse.svg';
import Logo from '../../assets/Logo.svg';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Label from '../../components/Label';
import TextBox from '../../components/TextBox';
import CopyAddress from '../../containers/KeyInfo/CopyAddress';
import Sidebar from '../../containers/Sidebar';
import Keys from '../../containers/Wallet/Keys';
import Proposals from '../../containers/Wallet/Proposals';
import Address from '../../containers/Wallet/Receive/Address';
import QRCode from '../../containers/Wallet/Receive/QRCode';
import Amount from '../../containers/Wallet/Send/Amount';
import Send from '../../containers/Wallet/Send/Send';
import DepositAddress from '../../containers/Wallet/Send/To';
import Tokens from '../../containers/Wallet/Tokens';
import Actions from '../../containers/Wallet/Validators/Actions';
import Validators from '../../containers/Wallet/Validators/Validators';
import ValidatorState from '../../containers/Wallet/Validators/ValidatorState';
import WithDrawValidators from '../../containers/Wallet/Withdraw/Validators';
import WithDraw from '../../containers/Wallet/Withdraw/WithDraw';
import './index.css';

const toggleClass = () => {
    console.log('Red');
    if (document.getElementById('side-bar').classList.contains('active')) {
        document.getElementById('side-bar').classList.remove('active');
    } else {
        document.getElementById('side-bar').classList.add('active');
    }
};

const Wallet = () => {
    return (
        <div className="wallet-section">
            <div className="dashboard-side-bar-container" id="side-bar">
                <div className="toggle-section" onClick={toggleClass}>
                    <Image alt="collapse-icon" className="collapse-icon" src={collapse}/>
                </div>
                <div className="settings-dropdown">
                    <Keys/>
                </div>
                <div className="side-bar-list">
                    <Sidebar/>
                </div>
            </div>
            <div className="wallet-container">
                <div className="top-info-section">
                    <div className="logo-info-section col-md-4">
                        <div className="top-section">
                            <TextBox className="sentinel-text" value="Amount"/>
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
                    </div>
                    <div className="token-info-section col-md-8">
                        <Tokens/>
                    </div>
                </div>
                <div className="wallet-details">
                    <div className="middle-section col-md-4">
                        <div className="flex-tabs">
                            <div className="tabs-section">
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
                                    <Tab eventKey="Receive" tabClassName="receive-tab" title="Receive">
                                        <TextBox className="qr-title" value="Show QR code to Receive Amount"/>
                                        <div className="qr-box">
                                            <QRCode/>
                                        </div>
                                        <div className="copy-address">
                                            <TextBox className="" value="Address"/>
                                            <CopyAddress/>
                                        </div>
                                        <Address/>
                                    </Tab>
                                </Tabs>
                            </div>
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
                    </div>
                    <div className="wallet-tab col-md-8">
                        <div className="filter-section">
                            <ValidatorState/>
                            <Actions/>
                        </div>
                        <Tabs defaultActiveKey="Validators" id="uncontrolled-tab-example">
                            <Tab eventKey="Validators" title="Validators List">
                                <Validators/>
                            </Tab>
                            <Tab eventKey="Proposals" title="Proposals">
                                <Proposals/>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
