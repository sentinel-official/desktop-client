import { IconButton } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
    fetchActiveValidatorsList,
    fetchDelegationsValidatorsList,
    fetchInActiveValidatorsList,
} from '../../../actions/staking';
import {
    fetchOtherTransactions,
    fetchSentTransactions,
    fetchReceivedTransactions,
} from '../../../actions/transactions';
import { getWalletDetails } from '../../../actions/wallet';
import Icon from '../../../components/Icon';
import './index.css';

const RefreshButton = (props) => {
    const handleRefresh = () => {
        props.getWalletDetails(props.activeAccount.address);
        props.fetchDelegationsValidatorsList(props.activeAccount.address);
        props.fetchOtherTransactions(props.activeAccount.address);
        props.fetchSentTransactions(props.activeAccount.address);
        props.fetchReceivedTransactions(props.activeAccount.address);
        if (props.activeList) {
            props.fetchActiveList();
        } else {
            props.fetchInActiveList();
        }
    };

    return (
        <div className="refresh_button">
            <IconButton aria-label="delete" onClick={handleRefresh}>
                <Icon
                    className="refresh"
                    icon="refresh"/>
            </IconButton>
        </div>
    );
};

RefreshButton.propTypes = {
    activeAccount: PropTypes.object.isRequired,
    activeList: PropTypes.bool.isRequired,
    fetchActiveList: PropTypes.func.isRequired,
    fetchDelegationsValidatorsList: PropTypes.func.isRequired,
    fetchInActiveList: PropTypes.func.isRequired,
    fetchOtherTransactions: PropTypes.func.isRequired,
    fetchReceivedTransactions: PropTypes.func.isRequired,
    fetchSentTransactions: PropTypes.func.isRequired,
    getWalletDetails: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        activeAccount: state.keys.activeAccount,
        activeList: state.staking.delegate.activeList,
    };
};

const actionToProps = {
    fetchDelegationsValidatorsList,
    fetchSentTransactions,
    fetchOtherTransactions,
    fetchActiveList: fetchActiveValidatorsList,
    fetchInActiveList: fetchInActiveValidatorsList,
    getWalletDetails,
    fetchReceivedTransactions,
};

export default connect(stateToProps, actionToProps)(RefreshButton);
