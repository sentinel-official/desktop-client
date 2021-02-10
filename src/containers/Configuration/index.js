import * as PropTypes from 'prop-types';
import BroadcastMode from './BroadcastMode';
import ChainID from './ChainID';
import Fee from './Fees';
import Gas from './Gas';
import GasAdjustment from './GasAdjustment';
import GasPrices from './GasPrices';
import Label from '../../components/Label';
import RPCAddress from './RPCAddress';
import React from 'react';
import Sidebar from '../common/SidebarOnboard';
import SimulateAndExecute from './SimulateAndExecute';
import SocialIcons from '../../components/SocialIcons';
import Submit from './Submit';
import TextBox from '../../components/TextBox';
import Tooltip from '../../components/Tooltip/Tooltip';
import TrustNode from './TrustNode';

const Configuration = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <Sidebar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="section-body">
                    <TextBox className="login-title" value="Configuration"/>
                    <div className="config-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Broadcast Mode"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <BroadcastMode/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Fee"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <Fee/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Gas"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <Gas/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Gas Adjustment"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <GasAdjustment/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Gas Prices"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <GasPrices/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Chain ID"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <ChainID/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Simulate And Execute"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <SimulateAndExecute/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="Trust Node"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <TrustNode/>
                            </div>
                            <div className="form-group">
                                <div className="label-icon">
                                    <Label
                                        className="label"
                                        label="RPC Address"
                                    />
                                    <Tooltip
                                        icon="tooltip"
                                        value="Help"
                                    />
                                </div>
                                <RPCAddress/>
                            </div>
                        </div>
                        <div className="login-footer">
                            <div className="login-button">
                                <Submit history={history}/>
                            </div>
                            <SocialIcons/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Configuration.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Configuration;
