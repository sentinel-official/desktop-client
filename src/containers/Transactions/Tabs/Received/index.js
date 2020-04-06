import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReceivedTransactions } from '../../../../actions/transactions';
import CircularProgress from '../../../../components/CircularProgress';
import NoData from '../../../../components/NoData';
import TransactionsList from '../../../../components/TransactionsList';
import './index.css';

class received extends Component {
    componentDidMount () {
        if (this.props.inProgress) {
            return;
        }

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
        const data = this.props.list && this.props.list.length > 0 && this.props.list.filter((value) => {
            return value.messages[0].data.to_address === this.props.activeAccount.address;
        });

        return (
            <div className="received_tab scroll_bar_div">
                {this.props.inProgress
                    ? <CircularProgress/>
                    : data && data.length > 0
                        ? <TransactionsList activeAddress={this.props.activeAccount.address} list={data}/>
                        : <NoData/>}
            </div>
        );
    }
}

received.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    list: PropTypes.any,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        list: state.transactions.receivedTransactions.list,
        inProgress: state.transactions.receivedTransactions.inProgress,
    };
};

const actionsToProps = {
    fetch: fetchReceivedTransactions,
};

export default connect(stateToProps, actionsToProps)(received);
