import React from 'react';
import './index.css';
import AuthenticationSideBar from '../../components/AuthenticationSideBar';
import ConfigurationForm from '../../containers/ConfigurationForm';

const Configuration = () => {
    return (
        <div className="auth-container">
            <div className="col-md-4">
                <AuthenticationSideBar />
            </div>
            <div className="col-md-8 config-section">
                <ConfigurationForm />
            </div>
        </div>
    );
};

export default Configuration;
