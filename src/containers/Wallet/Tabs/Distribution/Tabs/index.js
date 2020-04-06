import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTabValue } from '../../../../../actions/distribution';
import TabPanel from '../../../../../components/TabPanel';
import variables from '../../../../../dummy/variables';
import '../../Staking/Tabs/index.css';
import Withdraw from './Withdraw';
import WithdrawAll from './WithdrawAll';

const DistributionTabs = (props) => {
    const a11yProps = (index) => {
        return {
            id: `simple-staking-tab-${index}`,
            'aria-controls': `simple-staking-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
        if (newValue === props.tabValue) {
            return;
        }

        props.setTabValue(newValue);
    };

    return (
        <div className="staking_tabs">
            <AppBar className="horizontal_tabs" position="static">
                <Tabs
                    className="tabs_content"
                    value={props.tabValue}
                    variant="fullWidth"
                    onChange={handleChange}>
                    <Tab
                        className={'tab ' + (props.tabValue === 0 ? 'active_tab' : '')}
                        label={variables[props.lang]['withdraw_rewards']}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 1 ? 'active_tab' : '')}
                        label={variables[props.lang]['withdraw_all']}
                        {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel
                className="staking_tab"
                index={0}
                value={props.tabValue}>
                <Withdraw/>
            </TabPanel>
            <TabPanel
                className="staking_tab"
                index={1}
                value={props.tabValue}>
                <WithdrawAll/>
            </TabPanel>
        </div>
    );
};

DistributionTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.distribution.tabValue,
    };
};

const actionToProps = {
    setTabValue,
};

export default connect(stateToProps, actionToProps)(DistributionTabs);
