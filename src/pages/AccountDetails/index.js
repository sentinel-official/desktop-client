import * as PropTypes from 'prop-types';
import React from 'react';
import SideBar from '../../components/SideBar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import Address from '../../containers/AccountDetails/Address';
import Continue from '../../containers/AccountDetails/Continue';
import Seed from '../../containers/AccountDetails/Mnemonic';
import PublicKey from '../../containers/AccountDetails/PublicKey';
import './index.css';

const AccountDetails = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="account-create-row">
                    <TextBox
                        className="title"
                        value="Account Created Successfully!"
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
                        value="MNEMONIC"
                    />
                    <Seed/>
                    <TextBox
                        className="seed-note"
                        value="Note: Copy your keys to a secure location. Remember, we don't store any of your keys in our databases."
                    />
                    <div className="login-footer">
                        <div className="login-button">
                            <Continue history={history}/>
                        </div>
                        <SocialIcons/>
                    </div>
                </div>
            </div>
        </div>
    );
};

AccountDetails.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default AccountDetails;
