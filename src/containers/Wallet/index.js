import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDelegationsValidatorsList } from '../../actions/staking';
import WalletTabs from './Tabs';

class Wallet extends Component {
    componentDidMount () {
        if (this.props.activeAccount.address && this.props.list && this.props.list.length === 0) {
            this.props.fetch(this.props.activeAccount.address);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.activeAccount.address && pp.activeAccount.address !== this.props.activeAccount.address) {
            this.props.fetch(this.props.activeAccount.address);
        }
    }

    render () {
        return (
            <WalletTabs/>
        );
    }
}

Wallet.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    list: PropTypes.array,
};

const stateToProps = (state) => {
    return {
        list: state.staking.delegationsValidators.list,
        activeAccount: state.keys.activeAccount,
    };
};

const actionsToProps = {
    fetch: fetchDelegationsValidatorsList,
};

export default connect(stateToProps, actionsToProps)(Wallet);
