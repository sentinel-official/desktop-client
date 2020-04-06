import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTabValue } from '../../../actions/wallet';
import TabPanel from '../../../components/TabPanel';
import variables from '../../../dummy/variables';
import NavBar from '../../NavBar';
import Distribution from './Distribution';
import './index.css';
import Staking from './Staking';
import Wallet from './Wallet';
import Transaction from './Wallet/Transaction';

const WalletTabs = (props) => {
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
        <div className="wallet">
            <AppBar className="horizontal_tabs" position="static">
                <Tabs
                    className="tabs_content"
                    value={props.tabValue}
                    onChange={handleChange}>
                    <Tab
                        className={'tab ' + (props.tabValue === 0 ? 'active_tab' : '')}
                        label={variables[props.lang].wallet}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 1 ? 'active_tab' : '')}
                        label={variables[props.lang].staking}
                        {...a11yProps(1)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 2 ? 'active_tab' : '')}
                        label={variables[props.lang].distribution}
                        {...a11yProps(2)} />
                    <NavBar/>
                </Tabs>
            </AppBar>
            <TabPanel
                className="wallet_tab"
                index={0}
                value={props.tabValue}>
                {props.showTransaction
                    ? <Transaction/>
                    : <Wallet/>
                }
            </TabPanel>
            <TabPanel
                className="wallet_tab"
                index={1}
                value={props.tabValue}>
                <Staking/>
            </TabPanel>
            <TabPanel
                className="wallet_tab"
                index={2}
                value={props.tabValue}>
                <Distribution/>
            </TabPanel>
        </div>
    );
};

WalletTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    showTransaction: PropTypes.bool.isRequired,
    tabValue: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.wallet.tabValue,
        showTransaction: state.wallet.transactions.display,
    };
};

const actionToProps = {
    setTabValue,
};

export default connect(stateToProps, actionToProps)(WalletTabs);
