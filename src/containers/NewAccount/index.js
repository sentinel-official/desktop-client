import { AppBar, Tab, Tabs } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setAccountCreationStep, setTabValue } from '../../actions/account';
import TabPanel from '../../components/TabPanel';
import variables from '../../dummy/variables';
import GeneratedSeed from '../GeneratedSeed';
import MissingSeed from '../MissingSeed';
import RecoveryAccount from '../NavBar/Profile/RecoveryAccount';
import WalletCreation from '../WalletCreation';
import './index.css';

const NewAccount = (props) => {
    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    };

    const handleSteps = () => {
        switch (props.step) {
        case 1:
            return <WalletCreation/>;
        case 2:
            return <GeneratedSeed/>;
        case 3:
            return <MissingSeed/>;
        default:
            props.onChange(1);
            break;
        }
    };

    const handleChange = (event, newValue) => {
        if (newValue === props.tabValue) {
            return;
        }

        props.setTabValue(newValue);
    };

    const disable = Boolean(localStorage.getItem('mnemonic')) || props.step !== 1;

    return (
        <div className="create_new_account">
            <AppBar
                className="horizontal_tabs"
                position="static">
                <Tabs
                    className="tabs_content"
                    value={props.tabValue}
                    onChange={handleChange}>
                    <Tab
                        className={'tab ' + (props.tabValue === 0 ? 'active_tab' : '')}
                        label={variables[props.lang].create_new_account}
                        {...a11yProps(0)} />
                    <Tab
                        className={'tab ' + (props.tabValue === 0 ? 'active_tab' : '')}
                        disabled={disable}
                        label={variables[props.lang].recover_add_account}
                        {...a11yProps(0)} />
                </Tabs>
            </AppBar>
            <TabPanel
                className="account_tab"
                index={0}
                value={props.tabValue}>
                {handleSteps()}
            </TabPanel>
            <TabPanel
                className="account_tab"
                index={1}
                value={props.tabValue}>
                <RecoveryAccount/>
            </TabPanel>
        </div>
    );
};

NewAccount.propTypes = {
    lang: PropTypes.string.isRequired,
    setTabValue: PropTypes.func.isRequired,
    step: PropTypes.number.isRequired,
    tabValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        lang: state.language,
        step: state.account.new.step,
        tabValue: state.account.new.tabValue,
    };
};

const actionsToProps = {
    onChange: setAccountCreationStep,
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(NewAccount);
