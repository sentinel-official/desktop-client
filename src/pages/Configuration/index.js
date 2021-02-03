import * as PropTypes from 'prop-types';
import React from 'react';
import Label from '../../components/Label';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import BroadcastMode from '../../containers/Configuration/BroadcastMode';
import ChainID from '../../containers/Configuration/ChainID';
import Fee from '../../containers/Configuration/Fee';
import Gas from '../../containers/Configuration/Gas';
import GasAdjustment from '../../containers/Configuration/GasAdjustment';
import GasPrices from '../../containers/Configuration/GasPrices';
import RPCAddress from '../../containers/Configuration/RPCAddress';
import SimulateAndExecute from '../../containers/Configuration/SimulateAndExecute';
import Submit from '../../containers/Configuration/Submit';
import TrustNode from '../../containers/Configuration/TrustNode';
import './index.css';

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
                                <Label
                                    className="label"
                                    label="Broadcast Mode"
                                />
                                <BroadcastMode/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Fee"
                                />
                                <Fee/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Gas"
                                />
                                <Gas/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Gas Adjustment"
                                />
                                <GasAdjustment/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Gas Price"
                                />
                                <GasPrices/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Chain ID"
                                />
                                <ChainID/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Simulate And Execute"
                                />
                                <SimulateAndExecute/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Trust Node"
                                />
                                <TrustNode/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="RPC Address"
                                />
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
