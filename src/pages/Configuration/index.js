import React from 'react';
import './index.css';
import SideBar from '../../components/SideBar';
import TextBox from '../../components/TextBox';
import {
    AddressTextField, BroadCastChips,
    ChainIDTextField, FeeTextField,
    GasTextField, RpcServerChips,
    SubmitButton,
} from '../../containers/ConfigurationForm';
import SocialIcons from '../../components/SocialIcons';

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
                                <TextBox className="label" value="BROADCAST MODE" />
                                <BroadCastChips/>
                            </div>
                            <FeeTextField/>
                            <GasTextField/>
                        </div>
                        <div className="col-md-6">
                            <ChainIDTextField/>
                            <div className="form-group">
                                <TextBox className="label" value="Trust RPC Server" />
                                <RpcServerChips/>
                            </div>
                            <AddressTextField/>
                        </div>
                        <div className="login-footer">
                            <SocialIcons/>
                            <div className="login-button">
                                <SubmitButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Configuration;
