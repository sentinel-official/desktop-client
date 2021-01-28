import './index.css';
import React from 'react';
import AuthenticationSideBar from '../../components/AuthenticationSideBar';
import Login from '../../containers/Authentication/Login';

const Authentication = (props) => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <AuthenticationSideBar />
            </div>
            <div className="col-md-8 login-section">
                <Login />
            </div>
        </div>
    );
};

export default Authentication;
