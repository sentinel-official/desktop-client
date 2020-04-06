import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTabValue } from '../../../actions/transactions';
import TabPanel from '../../../components/TabPanel';
import variables from '../../../dummy/variables';
import './index.css';
import Other from './Other';
import Received from './Received';
import Sent from './Sent';

const TransactionTabs = (props) => {
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        if (newValue === props.value) {
            return;
        }

        props.setTabValue(newValue);
    };

    return (
        <div className="transaction_tabs">
            <AppBar className="horizontal_tabs" position="static">
                <Tabs
                    className="tabs_content"
                    value={props.value}
                    onChange={handleChange}>
                    <Tab
                        className={'tab ' + (props.value === 0 ? 'active_tab' : '')}
                        label={variables[props.lang].received}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (props.value === 1 ? 'active_tab' : '')}
                        label={variables[props.lang].sent}
                        {...a11yProps(1)} />
                    <Tab
                        className={'tab ' + (props.value === 2 ? 'active_tab' : '')}
                        label={variables[props.lang].other}
                        {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel
                className="transaction_tab"
                index={0}
                value={props.value}>
                <Received/>
            </TabPanel>
            <TabPanel
                className="transaction_tab"
                index={1}
                value={props.value}>
                <Sent/>
            </TabPanel>
            <TabPanel
                className="transaction_tab"
                index={2}
                value={props.value}>
                <Other/>
            </TabPanel>
        </div>
    );
};

TransactionTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        value: state.transactions.tabValue,
    };
};

const actionsToProps = {
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(TransactionTabs);
