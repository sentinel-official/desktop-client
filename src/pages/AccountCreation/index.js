import React from 'react';
import SideBar from '../../components/SideBar';
import TextBox from '../../components/TextBox';
import Label from '../../components/Label';
import Submit from '../../containers/AccountCreation/Submit';
import SocialIcons from '../../components/SocialIcons';
import Name from '../../containers/AccountCreation/Name';
import Password from '../../containers/AccountCreation/Password';
import Seed from '../../containers/AccountCreation/Seed';
import './index.css';

const AccountCreation = () => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="section-body">
                    <TextBox
                        className="title"
                        value="Creating Account"
                    />
                    <div className="account-create-row">
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
                        <hr/>
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

export default AccountCreation;
