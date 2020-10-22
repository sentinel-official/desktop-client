import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import PasswordField from './PasswordField';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';

const Authentication = (props) => {
    const submitHandler = (e) => {
        e.preventDefault();
        handleAppAuth();
    };

    const handleAppAuth = () => {
        // TODO: handle application authentication
        console.log(props.passwordValue);
    };

    return (
        <div className="Authentication-container">
            <div className="Authentication-left">
                <Sidebar/>
            </div>

            <div className="Authentication-right">
                <div className="Authentication-main">
                    <div className="Authentication-title">
                        Authenticate Sentinel Client
                    </div>
                    <form
                        id="login_form"
                        onSubmit={submitHandler}>

                        <div>
                            <PasswordField/>
                        </div>
                    </form>
                </div>
                <Footer/>
                <SubmitButton onClick={handleAppAuth}/>
            </div>
        </div>
    );
};

Authentication.propTypes = {
    passwordValue: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        passwordValue: state.application.password,
    };
};

const actionsToProps = {};

export default connect(stateToProps, actionsToProps)(Authentication);
