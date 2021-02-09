import * as PropTypes from 'prop-types';
import React from 'react';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import Sidebar from '../common/SidebarOnboard';
import Address from './Address';
import AddressCopy from './AddressCopy';
import Continue from './Continue';
import Mnemonic from './Mnemonic';
import MnemonicDownload from './MnemonicDownload';
import Note from './Note';
import PublicKey from './PublicKey';
import PublicKeyCopy from './PublicKeyCopy';

const KeyInfo = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <Sidebar/>
            </div>
            <div className="col-md-8 account-section">
                <div className="section-body">
                    <div className="account-create-row key-info">
                        <TextBox
                            className="title"
                            value="Account Created Successfully!"
                        />
                        <div className="label-icon">
                            <TextBox
                                className="label"
                                value="ADDRESS"
                            />
                            <AddressCopy/>
                        </div>
                        <Address/>
                        <div className="label-icon">
                            <TextBox
                                className="label"
                                value="PUBLIC KEY"
                            />
                            <PublicKeyCopy/>
                        </div>
                        <PublicKey/>
                        <div className="label-icon">
                            <TextBox
                                className="label"
                                value="MNEMONIC"
                            />
                            <MnemonicDownload/>
                        </div>
                        <Mnemonic/>
                        <TextBox
                            className="seed-note"
                            value="Note: Copy your keys to a secure location. Remember, we don't store any of your keys in our databases."
                        />
                        <div className="login-footer overflow-text">
                            <div className="login-button flex-center">
                                <div className="checkbox-section">
                                    <div className="custom-control custom-checkbox">
                                        <Note/>
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customCheck1">
                                            I have secured the seed safely
                                        </label>
                                    </div>
                                </div>
                                <Continue history={history}/>
                            </div>
                            <SocialIcons/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

KeyInfo.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default KeyInfo;
