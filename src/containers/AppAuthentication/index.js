import React from 'react';
import SideLogo from '../../components/SideLogo';
import Footer from '../../components/Footer';
import PasswordField from './PasswordField';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';

const AppAuthentication = (props) => {
    const submitHandler = (e) => {
        e.preventDefault();
        handleAppAuth();
    };

    const handleAppAuth = () => {
        // TODO: handle application authentication
        console.log(props.passwordValue);
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
                    <form
                        id="login_form"
                        onSubmit={submitHandler}>

                        <div className="form-group">
                            <PasswordField/>
                        </div>
                    </form>
                </div>
                <Footer/>
                <SubmitButton form_name="login_form"/>
            </div>
        </div>
    );
};

AppAuthentication.propTypes = {
    passwordValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        passwordValue: state.account.password,
    };
};

const actionsToProps = {

};

export default connect(stateToProps, actionsToProps)(AppAuthentication);
