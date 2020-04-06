import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTabValue } from '../../../../../actions/staking';
import TabPanel from '../../../../../components/TabPanel';
import variables from '../../../../../dummy/variables';
import Delegate from './Delegate';
import './index.css';
import ReDelegate from './ReDelegate';
import UnBond from './UnBond';

const StakingTabs = (props) => {
    const a11yProps = (index) => {
        return {
            id: `simple-staking-tab-${index}`,
            'aria-controls': `simple-staking-tabpanel-${index}`,
        };
    };

    const handleChange = (event, newValue) => {
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
                        label={variables[props.lang].delegate}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 1 ? 'active_tab' : '')}
                        label={variables[props.lang].re_delegate}
                        {...a11yProps(1)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 2 ? 'active_tab' : '')}
                        label={variables[props.lang].un_bond}
                        {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel
                className="staking_tab"
                index={0}
                value={props.tabValue}>
                <Delegate/>
            </TabPanel>
            <TabPanel
                className="staking_tab"
                index={1}
                value={props.tabValue}>
                <ReDelegate/>
            </TabPanel>
            <TabPanel
                className="staking_tab"
                index={2}
                value={props.tabValue}>
                <UnBond/>
            </TabPanel>
        </div>
    );
};

StakingTabs.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    tabValue: PropTypes.number.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        tabValue: state.staking.tabValue,
    };
};

const actionToProps = {
    setTabValue,
};

export default connect(stateToProps, actionToProps)(StakingTabs);
