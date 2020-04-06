import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTransactionTabValue } from '../../../../../actions/wallet';
import TabPanel from '../../../../../components/TabPanel';
import variables from '../../../../../dummy/variables';
import './index.css';
import Receive from './Receive';
import Send from './Send';

const TransactionTabs = (props) => {
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        if (newValue === props.tabValue) {
            return;
        }

        props.setTabValue(newValue);
    };

    return (
        <div className="transactions">
            <AppBar className="horizontal_tabs" position="static">
                <Tabs
                    className="tabs_content"
                    value={props.tabValue}
                    variant="fullWidth"
                    onChange={handleChange}>
                    <Tab
                        className={'tab ' + (props.tabValue === 0 ? 'active_tab' : '')}
                        label={variables[props.lang].send}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 1 ? 'active_tab' : '')}
                        label={variables[props.lang].receive}
                        {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel
                className="wallet_transaction_tab"
                index={0}
                value={props.tabValue}>
                <Send/>
            </TabPanel>
            <TabPanel
                className="wallet_transaction_tab"
                index={1}
                value={props.tabValue}>
                <Receive/>
            </TabPanel>
        </div>
    );
};

TransactionTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.wallet.transactions.tabValue,
    };
};

const actionToProps = {
    setTabValue: setTransactionTabValue,
};

export default connect(stateToProps, actionToProps)(TransactionTabs);
