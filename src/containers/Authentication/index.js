import * as PropTypes from 'prop-types';
import React from 'react';
import Label from '../../components/Label';
import Sidebar from '../../components/Sidebar';
import SocialIcons from '../../components/SocialIcons';
import TextBox from '../../components/TextBox';
import Password from './Password';
import Submit from './Submit';

const Authentication = ({ history }) => {
    return (
        <div className="login auth-container">
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
                        <Password/>
                    </div>
                </div>
                <div className="login-footer">
                    <div className="login-button">
                        <Submit history={history}/>
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
