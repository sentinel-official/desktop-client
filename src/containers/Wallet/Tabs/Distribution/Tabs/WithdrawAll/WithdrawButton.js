import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIntervalValue, transactionHash } from '../../../../../../actions/transactions';
import variables from '../../../../../../dummy/variables';

class WithdrawButton extends Component {
    componentDidUpdate (pp, ps, ss) {
        if (this.props.startSetInterval && this.props.distributionTab === 2 && this.props.withdrawAllTab === 1) {
            let value = 0;
            value = setInterval(() => {
                this.props.transactionHash(this.props.hash);
            }, 1000);
            this.props.setIntervalValue(value);
        }
    }

    render () {
        return (
            <div className="withdraw_all_button">
                <Button
                    className="active_button"
                    disabled={this.props.disable}
                    variant="outlined"
                    onClick={this.props.onClick}>
                    {variables[this.props.lang].withdraw}
                </Button>
            </div>
        );
    }
}

WithdrawButton.propTypes = {
    disable: PropTypes.bool.isRequired,
    distributionTab: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    setIntervalValue: PropTypes.func.isRequired,
    startSetInterval: PropTypes.bool.isRequired,
    transactionHash: PropTypes.func.isRequired,
    withdrawAllTab: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        hash: state.staking.hash,
        lang: state.language,
        startSetInterval: state.transactions.startSetInterval,
        withdrawAllTab: state.distribution.tabValue,
        distributionTab: state.wallet.tabValue,
    };
};

const actionsToProps = {
    setIntervalValue,
    transactionHash,
};

export default connect(stateToProps, actionsToProps)(WithdrawButton);
