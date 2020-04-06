import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setAccountCreationStep } from '../../actions/account';
import { fetchKeys, setLocalSeed } from '../../actions/keys';
import { getWalletDetails } from '../../actions/wallet';
import SplashScreen from '../../components/SplashScreen';
import './index.css';

class Home extends Component {
    componentDidMount () {
        this.props.fetchKeys();
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.keys && this.props.keys.length === 0) {
            this.props.history.push({
                pathname: '/createAccount',
            });
        } else {
            this.props.getWalletDetails(this.props.activeAccount.address);
            if (localStorage.getItem('mnemonic')) {
                const seed = {
                    pub_key: localStorage.getItem('pub_key'),
                    address: localStorage.getItem('address'),
                    mnemonic: localStorage.getItem('mnemonic'),
                };
                this.props.setLocalSeed(seed);
                this.props.onChange(3);
                this.props.history.push({
                    pathname: '/createAccount',
                });
            } else {
                this.props.history.push({
                    pathname: '/dashboard',
                });
            }
        }
    }

    render () {
        return (
            <div className="home">
                <SplashScreen/>
            </div>
        );
    }
}

Home.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    fetchKeys: PropTypes.func.isRequired,
    getWalletDetails: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    keys: PropTypes.array.isRequired,
    setLocalSeed: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        keys: state.keys.accounts.list,
        activeAccount: state.keys.activeAccount,
    };
};

const actionsToProps = {
    fetchKeys,
    getWalletDetails,
    onChange: setAccountCreationStep,
    setLocalSeed,
};

export default withRouter(connect(stateToProps, actionsToProps)(Home));
