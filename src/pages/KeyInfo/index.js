import * as PropTypes from 'prop-types';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import Address from '../../containers/KeyInfo/Address';
import AddressCopy from '../../containers/KeyInfo/AddressCopy';
import Continue from '../../containers/KeyInfo/Continue';
import Seed from '../../containers/KeyInfo/Mnemonic';
import MnemonicDownload from '../../containers/KeyInfo/MnemonicDownload';
import Note from '../../containers/KeyInfo/Note';
import PublicKey from '../../containers/KeyInfo/PublicKey';
import PublicKeyCopy from '../../containers/KeyInfo/PublicKeyCopy';
import './index.css';

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
                                value="Seed"
                            />
                            <MnemonicDownload/>
                        </div>
                        <Seed/>
                        <TextBox
                            className="seed-note"
                            value="Note: CopyAddress your keys to a secure location. Remember, we don't store any of your keys in our databases."
                        />
                        <div className="login-footer overflow-text">
                            <div className="login-button flex-center">
                                <div className="checkbox-section">
                                    <div className="custom-control custom-checkbox">
                                        <Note/>
                                        <label className="custom-control-label" htmlFor="customCheck1">I have secured
                                            the seed safely</label>
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
