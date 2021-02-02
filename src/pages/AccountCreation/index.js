import * as PropTypes from 'prop-types';
import React from 'react';
import Label from '../../components/Label';
import SideBar from '../../components/SideBar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import Mnemonic from '../../containers/AccountCreation/Mnemonic';
import Name from '../../containers/AccountCreation/Name';
import Password from '../../containers/AccountCreation/Password';
import Submit from '../../containers/AccountCreation/Submit';
import './index.css';

const AccountCreation = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="section-body">
                    <TextBox
                        className="title"
                        value="Create Account"
                    />
                    <div className="account-create-row">
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Name"
                            />
                            <Name/>
                        </div>
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Password"
                            />
                            <Password/>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <Label
                                className="label"
                                label="Mnemonic"
                            />
                            <Mnemonic/>
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

AccountCreation.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default AccountCreation;
