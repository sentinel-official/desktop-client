import React from 'react';
import './index.css';
import SideBar from '../../components/SideBar';
import TextBox from '../../components/TextBox';
import AddressTextField from '../../containers/Configuration/AddressTextField';
import BroadCastChips from '../../containers/Configuration/BroadCastChips';
import ChainIDTextField from '../../containers/Configuration/ChainIDTextField';
import FeeTextField from '../../containers/Configuration/FeeTextField';
import GasTextField from '../../containers/Configuration/GasTextField';
import TrustServerChips from '../../containers/Configuration/TrustServerChips';
import SubmitButton from '../../containers/Configuration/SubmitButton';
import SocialIcons from '../../components/SocialIcons';
import Label from '../../components/Label';

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
                                    label="BroadCast Mode"
                                />
                                <BroadCastChips/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Enter Fee"
                                />
                                <FeeTextField/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Gas"
                                />
                                <GasTextField/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Chain ID"
                                />
                                <ChainIDTextField/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="Trust RPC Server"
                                />
                                <TrustServerChips/>
                            </div>
                            <div className="form-group">
                                <Label
                                    className="label"
                                    label="RPC Server Address"
                                />
                                <AddressTextField/>
                            </div>
                        </div>
                        <div className="login-footer">
                            <div className="login-button">
                                <SubmitButton/>
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
