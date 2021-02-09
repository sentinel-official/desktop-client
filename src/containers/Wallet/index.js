import Async from 'async';
import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getConfiguration, putConfiguration } from '../../actions/configuration';
import { getKeys } from '../../actions/keys';
import collapse from '../../assets/collapse.svg';
import Logo from '../../assets/Logo.svg';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Label from '../../components/Label';
import Loader from '../../components/Loader';
import TextBox from '../../components/TextBox';
import CopyAddress from '../../containers/KeyInfo/AddressCopy';
import Sidebar from '../../containers/Sidebar';
import ModalConfiguration from '../common/ModalConfiguration';
import ModalTxInfo from '../common/ModalTxInfo';
import Balance from './Balance';
import Keys from './Keys';
// import Proposals from './Proposals';
import Address from './Receive/Address';
import QRCode from './Receive/QRCode';
import Amount from './Send/Amount';
import ModalSend from './Send/Modal';
import Send from './Send/Send';
import DepositAddress from './Send/To';
import Validators from './Validators';
import Actions from './Validators/Actions';
import ModalDelegate from './Validators/ModalDelegate';
import ModalRedelegate from './Validators/ModalRedelegate';
import ModalUnbond from './Validators/ModalUnbond';
import Status from './Validators/Status';
import WithDrawValidators from './Withdraw/Validators';
import WithDraw from './Withdraw/Withdraw';

const toggleClass = () => {
    if (document.getElementById('side-bar').classList.contains('active')) {
        document.getElementById('side-bar').classList.remove('active');
    } else {
        document.getElementById('side-bar').classList.add('active');
    }
};

const Wallet = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Async.waterfall([
            (next) => {
                props.getConfiguration(
                    props.history,
                    next,
                );
            }, (next) => {
                props.getKeys(
                    props.history,
                    next,
                );
            }, (next) => {
                props.putConfiguration(
                    next,
                );
            }, (next) => {
                setLoading(false);
                next(null);
            },
        ], () => ({}));
    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <>
            <ModalConfiguration history={props.history}/>
            <ModalSend/>
            <ModalDelegate/>
            <ModalRedelegate/>
            <ModalUnbond/>
            <ModalTxInfo/>
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
                                <TextBox
                                    className="sentinel-text"
                                    value="Tokens"
                                />
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
                            <Balance/>
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
                                                    label="To Address"
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
                                <Status/>
                                <Actions/>
                            </div>
                            <Tabs defaultActiveKey="Validators" id="uncontrolled-tab-example">
                                <Tab eventKey="Validators" title="Validators List">
                                    <Validators/>
                                </Tab>
                                {/* <Tab eventKey="Proposals" title="Proposals"> */}
                                {/*    <Proposals/> */}
                                {/* </Tab> */}
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Wallet.propTypes = {
    getConfiguration: PropTypes.func.isRequired,
    getKeys: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    putConfiguration: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {};
};

const actionsToProps = {
    getConfiguration: getConfiguration,
    getKeys: getKeys,
    putConfiguration: putConfiguration,
};

export default connect(stateToProps, actionsToProps)(Wallet);
