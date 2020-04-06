import Fab from '@material-ui/core/Fab';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchKeys } from '../../../../../actions/keys';
import { fetchDelegationsValidatorsList } from '../../../../../actions/staking';
import {
    fetchOtherTransactions,
    fetchSentTransactions,
    setIntervalValue,
    transactionHash,
} from '../../../../../actions/transactions';
import { getWalletDetails, showTransaction } from '../../../../../actions/wallet';
import sentinelLogo from '../../../../../assets/sentinel_icon.png';
import Card from '../../../../../components/Card';
import CircularProgress from '../../../../../components/CircularProgress';
import NoData from '../../../../../components/NoData';
import variables from '../../../../../dummy/variables';
import wallet from '../../../../../utils/wallet';

class WalletCards extends Component {
    componentDidMount () {
        if (this.props.accounts.length === 0 && !this.props.fetchKeysInProgress) {
            this.props.fetchKeys();
        }
        if (this.props.startSetInterval) {
            let value = 0;
            value = setInterval(() => {
                this.props.transactionHash(this.props.hash);
            }, 1000);
            this.props.setIntervalValue(value);
        }
    }

    componentDidUpdate (pp, ps, ss) {
        if (this.props.activeAccount.address && pp.activeAccount.address !== this.props.activeAccount.address) {
            this.props.getWalletDetails(this.props.activeAccount.address);
        }

        if (this.props.success && pp.success !== this.props.success) {
            clearInterval(this.props.intervalValue);
            if (this.props.delegatorListFetch) {
                this.props.fetch(this.props.activeAccount.address);
                this.props.fetchOtherTransactions(this.props.activeAccount.address);
            }

            if (this.props.sentTransactionFetch) {
                this.props.fetchSentTransactions(this.props.activeAccount.address);
            }

            this.props.getWalletDetails(this.props.activeAccount.address);
            this.props.setIntervalValue(0);
        }
    }

    render () {
        return (
            <span className="wallet_card_span">
                {this.props.inProgress
                    ? <CircularProgress/>
                    : this.props.value &&
                    this.props.value.length > 0
                        ? this.props.value.map((val, index) => {
                            return (
                                <div key={index} className="cards_div">
                                    <Card
                                        image={val.image
                                            ? val.image
                                            : <img
                                                alt="sentinel logo"
                                                src={sentinelLogo}/>}
                                        type={val.denom}
                                        value={wallet((val.value * Math.pow(10, -6)).toFixed(6))}/>
                                    <div className="hover_button">
                                        <Fab
                                            aria-label="add"
                                            className="send_receive_button"
                                            color="primary"
                                            size="medium"
                                            variant="extended"
                                            onClick={this.props.showTransaction}
                                        >
                                            {variables[this.props.lang].send_receive}
                                        </Fab>
                                    </div>
                                </div>
                            );
                        })
                        : <NoData/>}
            </span>
        );
    }
}

WalletCards.propTypes = {
    accounts: PropTypes.array.isRequired,
    activeAccount: PropTypes.object.isRequired,
    delegatorListFetch: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    fetchKeys: PropTypes.func.isRequired,
    fetchKeysInProgress: PropTypes.bool.isRequired,
    fetchOtherTransactions: PropTypes.func.isRequired,
    fetchSentTransactions: PropTypes.func.isRequired,
    getWalletDetails: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    inProgress: PropTypes.bool.isRequired,
    intervalValue: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,
    sentTransactionFetch: PropTypes.bool.isRequired,
    setIntervalValue: PropTypes.func.isRequired,
    showTransaction: PropTypes.func.isRequired,
    startSetInterval: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    transactionHash: PropTypes.func.isRequired,
    value: PropTypes.array.isRequired,
};

const stateToProps = (state) => {
    return {
        value: state.wallet.wallets.items,
        inProgress: state.wallet.wallets.inProgress,
        accounts: state.keys.accounts.list,
        activeAccount: state.keys.activeAccount,
        fetchKeysInProgress: state.keys.accounts.inProgress,
        success: state.transactions.success,
        hash: state.transactions.hash,
        intervalValue: state.transactions.setIntervalValue,
        startSetInterval: state.transactions.startSetInterval,
        sentTransactionFetch: state.transactions.sentTransactionFetch,
        delegatorListFetch: state.staking.delegatorListFetch,
        lang: state.language,
    };
};

const actionToProps = {
    showTransaction,
    fetchKeys,
    getWalletDetails,
    setIntervalValue,
    transactionHash,
    fetchSentTransactions,
    fetch: fetchDelegationsValidatorsList,
    fetchOtherTransactions,
};

export default connect(stateToProps, actionToProps)(WalletCards);
