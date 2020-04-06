import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOtherTransactions } from '../../../../actions/transactions';
import CircularProgress from '../../../../components/CircularProgress';
import NoData from '../../../../components/NoData';
import OtherTransactions from '../../../../components/OtherTransactions';
import { transactionType, type } from '../../../../utils/otherTransactions';
import './index.css';

class Other extends Component {
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
        return (
            <div className="other scroll_bar_div">
                {this.props.inProgress
                    ? <CircularProgress/>
                    : this.props.list &&
                    this.props.list.length > 0
                        ? this.props.list.map((value, index) => {
                            if (type(value.messages[0].type) === 'bank') {
                                return null;
                            }

                            if (value.messages && value.messages.length > 1) {
                                return value.messages.map((val, idx) => {
                                    return (
                                        <OtherTransactions
                                            key={index.toString() + idx}
                                            failed={value.result && value.result.code}
                                            tokens={value.data && value.data.amount && value.data.amount}
                                            type={transactionType(val.type)}
                                            value={value}/>
                                    );
                                });
                            }

                            return (
                                <OtherTransactions
                                    key={index}
                                    failed={value.result && value.result.code}
                                    tokens={value.messages[0].data.amount && value.messages[0].data.amount}
                                    type={transactionType(value.messages[0].type)}
                                    value={value}/>
                            );
                        })
                        : <NoData/>}
            </div>
        );
    }
}

Other.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    list: PropTypes.array,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        list: state.transactions.otherTransactions.list,
        inProgress: state.transactions.otherTransactions.inProgress,
    };
};

const actionToProps = {
    fetch: fetchOtherTransactions,
};

export default connect(stateToProps, actionToProps)(Other);
