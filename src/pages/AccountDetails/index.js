import React from 'react';
import './index.css';
import TextBox from '../../components/TextBox';
import SocialIcons from '../../components/SocialIcons';
import SideBar from '../../components/SideBar';
import Address from '../../containers/AccountDetails/Address';
import PublicKey from '../../containers/AccountDetails/PublicKey';
import Seed from '../../containers/AccountDetails/Seed';
import ButtonContinue from '../../containers/AccountDetails/ButtonContinue';

const AccountDetails = () => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="account-create-row">
                    <TextBox
                        className="title"
                        value="Account Created Succefully!"
                    />
                    <TextBox
                        className="label"
                        value="ADDRESS"
                    />
                    <Address/>
                    <TextBox
                        className="label"
                        value="PUBLIC KEY"
                    />
                    <PublicKey/>
                    <TextBox
                        className="label"
                        value="BROADCAST MODE"
                    />
                    <Seed/>
                    <TextBox
                        className="seed-note"
                        value="Note: Copy your keys to a secure location. Remember, we don't store any of your keys in our databases."
                    />
                    <div className="login-footer">
                        <div className="login-button">
                            <ButtonContinue/>
                        </div>
                        <SocialIcons/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;
