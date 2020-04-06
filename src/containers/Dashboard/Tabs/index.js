import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TabPanel from '../../../components/TabPanel';
import variables from '../../../dummy/variables';
import NavBar from '../../NavBar';
import Dashboard from './Dashboard';
import './index.css';

const DashboardTabs = (props) => {
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    return (
        <div className="dashboard">
            <AppBar className="horizontal_tabs" position="static">
                <Tabs
                    className="tabs_content"
                    value={0}>
                    <Tab
                        className="tab active_tab"
                        label={variables[props.lang].dashboard}
                        {...a11yProps(0)} />
                    <NavBar/>
                </Tabs>
            </AppBar>
            <TabPanel
                className="dashboard_tab"
                index={0}
                value={0}>
                <Dashboard/>
            </TabPanel>
        </div>
    );
};

DashboardTabs.propTypes = {
    lang: PropTypes.string.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
    };
};

export default connect(stateToProps)(DashboardTabs);
