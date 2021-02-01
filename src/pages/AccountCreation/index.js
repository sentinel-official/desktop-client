import React from 'react';
import './index.css';
import SideBar from '../../components/SideBar';
import TextBox from '../../components/TextBox';
import Label from '../../components/Label';
import BroadcastMode from '../../containers/Configuration/BroadcastMode';
import Fee from '../../containers/Configuration/Fee';
import Gas from '../../containers/Configuration/Gas';
import Submit from '../../containers/CreateAccount/submit';
import SocialIcons from '../../components/SocialIcons';
import Name from '../../containers/CreateAccount/Name';
import Password from '../../containers/CreateAccount/Password';
import Seed from '../../containers/CreateAccount/Seed';

const CreatAccount = () => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 config-section">
                <div className="section-body">
                    <TextBox className="login-title" value="Configure Settings"/>
                    <div className="config-row">
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Account Name"
                            />
                            <Name/>
                        </div>
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Account Password"
                            />
                            <Password/>
                        </div>
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Enter Seed"
                            />
                            <Seed/>
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

export default CreatAccount;
