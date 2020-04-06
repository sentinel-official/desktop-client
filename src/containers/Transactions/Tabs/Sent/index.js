import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSentTransactions } from '../../../../actions/transactions';
import CircularProgress from '../../../../components/CircularProgress';
import NoData from '../../../../components/NoData';
import TransactionsList from '../../../../components/TransactionsList';
import './index.css';

class Sent extends Component {
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
            return value.messages[0].data.from_address === this.props.activeAccount.address;
        });

        return (
            <div className="received_tab sent_tab scroll_bar_div">
                {this.props.inProgress
                    ? <CircularProgress/>
                    : data && data.length > 0
                        ? <TransactionsList activeAddress={this.props.activeAccount.address} list={data}/>
                        : <NoData/>}
            </div>
        );
    }
}

Sent.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    list: PropTypes.any,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        list: state.transactions.sentTransactions.list,
        inProgress: state.transactions.sentTransactions.inProgress,
    };
};

const actionsToProps = {
    fetch: fetchSentTransactions,
};

export default connect(stateToProps, actionsToProps)(Sent);
