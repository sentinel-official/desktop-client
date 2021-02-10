import * as PropTypes from 'prop-types';
import { COIN_DENOM } from '../../constants/common';
import { Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getConfiguration, putConfiguration } from '../../actions/configuration';
import { getKeys } from '../../actions/keys';
import Async from 'async';
import Balance from './Balance';
import Collapse from '../../assets/Collapse.svg';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Keys from './Keys';
import Label from '../../components/Label';
import Loader from '../../components/Loader';
import Logo from '../../assets/Logo.svg';
import ModalConfiguration from '../common/ModalConfiguration';
import ModalTxInfo from '../common/ModalTxInfo';
import React, { useEffect, useState } from 'react';
import Receive from './Receive';
import SendAmount from './Send/Amount';
import SendModal from './Send/Modal';
import SendSend from './Send/Send';
import SendTo from './Send/To';
import Sidebar from '../common/SidebarDashboard';
import TextBox from '../../components/TextBox';
import Validators from './Validators';
import ValidatorsActions from './Validators/Actions';
import ValidatorsModalDelegate from './Validators/ModalDelegate';
import ValidatorsModalRedelegate from './Validators/ModalRedelegate';
import ValidatorsModalUnbond from './Validators/ModalUnbond';
import ValidatorsStatus from './Validators/Status';
import WithdrawRewardsModal from './WithdrawRewards/Modal';
import WithdrawRewardsValidators from './WithdrawRewards/Validators';
import WithdrawRewardsWithDraw from './WithdrawRewards/Withdraw';

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
            <SendModal/>
            <ValidatorsModalDelegate/>
            <ValidatorsModalRedelegate/>
            <ValidatorsModalUnbond/>
            <WithdrawRewardsModal/>
            <ModalTxInfo/>
            <div className="wallet-section">
                <div
                    className="dashboard-side-bar-container"
                    id="side-bar">
                    <div
                        className="toggle-section"
                        onClick={toggleClass}>
                        <Image
                            alt="collapse-icon"
                            className="collapse-icon"
                            src={Collapse}
                        />
                    </div>
                    <div className="settings-dropdown">
                        <Keys/>
                    </div>
                    <div className="side-bar-list">
                        <Sidebar location={props.location}/>
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
                                            <Image
                                                alt="Logo"
                                                className=""
                                                src={Logo}
                                            />
                                        </div>
                                        <TextBox
                                            className="sentinel-text"
                                            value="Sentinel"
                                        />
                                        <TextBox
                                            className="sub-text"
                                            value={`(${COIN_DENOM})`}
                                        />
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
                                    <Tabs
                                        defaultActiveKey="receive"
                                        transition={false}>
                                        <Tab
                                            eventKey="receive"
                                            tabClassName="receive-tab"
                                            title="Receive">
                                            <Receive/>
                                        </Tab>
                                        <Tab
                                            eventKey="send"
                                            title="Send">
                                            <div className="form-group">
                                                <Label
                                                    className="label"
                                                    label="To Address"
                                                />
                                                <SendTo/>
                                            </div>
                                            <div className="form-group">
                                                <Label
                                                    className="label"
                                                    label="amount"
                                                />
                                                <SendAmount/>
                                            </div>
                                            <SendSend/>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div className="withdraw-section">
                                    <TextBox
                                        className="title"
                                        value="Withdraw Rewards"
                                    />
                                    <div className="withdraw-section-content">
                                        <div className="form-group">
                                            <Label
                                                className="label"
                                                label="Validators"
                                            />
                                            <WithdrawRewardsValidators/>
                                        </div>
                                        <WithdrawRewardsWithDraw/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wallet-tab col-md-8">
                            <div className="filter-section">
                                <ValidatorsStatus/>
                                <ValidatorsActions/>
                            </div>
                            <Tabs
                                defaultActiveKey="validators"
                                transition={false}>
                                <Tab
                                    eventKey="validators"
                                    title="Validators">
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
