import * as PropTypes from 'prop-types';
import Label from '../../components/Label';
import Password from './Password';
import React from 'react';
import Sidebar from '../common/SidebarOnboard';
import SocialIcons from '../../components/SocialIcons';
import Submit from './Submit';
import TextBox from '../../components/TextBox';

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
