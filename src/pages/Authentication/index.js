import * as PropTypes from 'prop-types';
import React from 'react';
import Label from '../../components/Label';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import PasswordTextField from '../../containers/Authentication/Password';
import SubmitButton from '../../containers/Authentication/Submit';
import './index.css';

const Authentication = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <Sidebar/>
            </div>
            <div className="col-md-8 login-section">
                <div className="login-body">
                    <TextBox
                        className="login-title"
                        value="Authenticate"
                    />
                    <div className="form-group">
                        <Label
                            className="label"
                            label="PASSWORD"
                        />
                        <PasswordTextField/>
                    </div>
                </div>
                <div className="login-footer">
                    <div className="login-button">
                        <SubmitButton history={history}/>
                    </div>
                    <SocialIcons/>
                </div>
            </div>
        </div>
    );
};

Authentication.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export default Authentication;
