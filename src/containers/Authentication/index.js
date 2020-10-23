import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import PasswordField from './PasswordField';
import './index.css';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import SubmitButton from './SubmitButton';

const Authentication = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        onClick();
    };

    const onClick = () => {
        // TODO: handle application authentication
        console.log(props.password);
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
                        onSubmit={onSubmit}>
                        <div>
                            <PasswordField/>
                        </div>
                    </form>
                </div>
                <Footer/>
                <SubmitButton onClick={onClick}/>
            </div>
        </div>
    );
};

Authentication.propTypes = {
    password: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        password: state.application.password,
    };
};

export default connect(stateToProps)(Authentication);
