import * as PropTypes from 'prop-types';
import React from 'react';
import SideBar from '../../components/SideBar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import PasswordTextField from '../../containers/Authentication/PasswordTextField';
import Label from '../../components/Label';
import SubmitButton from '../../containers/Authentication/SubmitButton';
import './index.css';

const Authentication = ({ history }) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <SideBar/>
            </div>
            <div className="col-md-8 login-section">
                <div className="login-body">
                    <TextBox
                        className="login-title"
                        value="Authenticate Sentinel Client"
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
