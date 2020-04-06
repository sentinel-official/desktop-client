import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFaucet } from '../../actions/navbar';
import { setIntervalValue, transactionHash } from '../../actions/transactions';
import { encodeToBech32 } from '../../utils/encode';

class Faucet extends Component {
    constructor (props) {
        super(props);
        this.faucetTransfer = this.faucetTransfer.bind(this);
    }

    faucetTransfer () {
        const data = {
            address: encodeToBech32(this.props.address, 'sent'),
        };

        this.props.fetchFaucet(data, (error) => {
            if (!error) {
                if (this.props.startSetInterval) {
                    let value = 0;
                    value = setInterval(() => {
                        this.props.transactionHash(this.props.hash);
                    }, 1000);
                    this.props.setIntervalValue(value);
                }
            }
        });
    }

    render () {
        const disabled = this.props.inProgress || this.props.intervalValue > 0;

        return (
            <div>
                <Button
                    className="continue_button faucet_button"
                    disabled={disabled}
                    onClick={this.faucetTransfer}>
                    Faucet
                </Button>
            </div>
        );
    }
}

Faucet.propTypes = {
    fetchFaucet: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    inProgress: PropTypes.bool.isRequired,
    intervalValue: PropTypes.number.isRequired,
    setIntervalValue: PropTypes.func.isRequired,
    startSetInterval: PropTypes.bool.isRequired,
    transactionHash: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
    address: PropTypes.string,
};

const stateToProps = (state) => {
    return {
        address: state.keys.activeAccount.address,
        hash: state.navBar.faucet.hash,
        inProgress: state.navBar.faucet.inProgress,
        intervalValue: state.transactions.setIntervalValue,
        startSetInterval: state.transactions.startSetInterval,
        value: state.wallet.wallets.items,
    };
};

const actionToProps = {
    fetchFaucet,
    setIntervalValue,
    transactionHash,
};

export default connect(stateToProps, actionToProps)(Faucet);
