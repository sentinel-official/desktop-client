import React from 'react';
import Label from '../../components/Label';
import SideBar from '../../components/SideBar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import BroadcastMode from '../../containers/Configuration/BroadcastMode';
import ChainID from '../../containers/Configuration/ChainID';
import Fee from '../../containers/Configuration/Fee';
import Gas from '../../containers/Configuration/Gas';
import RPCAddress from '../../containers/Configuration/RPCAddress';
import Submit from '../../containers/Configuration/Submit';
import TrustNode from '../../containers/Configuration/TrustNode';
import './index.css';

const Configuration = () => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 config-section">
                <div className="section-body">
                    <TextBox className="login-title" value="Configure Settings"/>
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
                                <Submit/>
                            </div>
                            <SocialIcons/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuration;
