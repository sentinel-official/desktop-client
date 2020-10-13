import React from 'react';
import SideLogo from '../../components/SideLogo';
import Footer from '../../components/Footer';
import PasswordField from "./PasswordField";
import './index.css';

const AppAuthentication = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('login form submitted');
    };

    return (
        <div className={'form-container'}>
            <div className="side_bar">
                <SideLogo/>
            </div>

            <div className={'right_half'}>
                <div className={'main-section'}>
                    <div className={'form_title'}>
                        Authenticate Sentinel Client
                    </div>
                    <form id="login_form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <PasswordField/>
                        </div>
                    </form>
                </div>
                <div className={'footer'}>
                    <Footer button_name="LOGIN" form_name="login_form"/>
                </div>
            </div>

        </div>
    );
};

export default AppAuthentication;