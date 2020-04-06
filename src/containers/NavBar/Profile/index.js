import { Button } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setTabValue } from '../../../actions/account';
import { setActiveAccount } from '../../../actions/keys';
import { hideProfilePopover, showDeleteAccountDialog, showProfilePopover } from '../../../actions/navbar';
import ProfileImg from '../../../assets/profile.png';
import ProfilePopover from '../../../components/ProfilePopover';
import DeleteAccountDialog from './DeleteDialog';
import './index.css';

const Profile = (props) => {
    const open = Boolean(props.popover);
    const id = open ? 'simple-popover' : undefined;

    const handleDelete = (value) => {
        props.showDialog(value);
    };

    const handleTabValue = (value) => {
        props.setTabValue(value);
    };

    return (
        <div className="profile">
            <Button
                aria-describedby={id}
                className="profile_button"
                variant="contained"
                onClick={(event) => props.showProfilePopover(event.currentTarget)}>
                <p className="text">
                    {props.activeAccount && props.activeAccount.name && props.activeAccount.name}
                </p>
                <img alt="profile" src={ProfileImg}/>
            </Button>
            <ProfilePopover
                accounts={props.accounts}
                activeAccount={props.activeAccount}
                deleteAccount={handleDelete}
                handleActiveAccount={props.setActiveAccount}
                handleClose={props.hideProfilePopover}
                id={id}
                lang={props.lang}
                open={open}
                popover={props.popover}
                setTabValue={handleTabValue}/>
            <DeleteAccountDialog/>
        </div>
    );
};

Profile.propTypes = {
    accounts: PropTypes.array.isRequired,
    activeAccount: PropTypes.object.isRequired,
    hideProfilePopover: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    setActiveAccount: PropTypes.func.isRequired,
    setTabValue: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
    showProfilePopover: PropTypes.func.isRequired,
    popover: PropTypes.any,
};

const stateToProps = (state) => {
    return {
        popover: state.navBar.profile.popOver,
        lang: state.language,
        accounts: state.keys.accounts.list,
        activeAccount: state.keys.activeAccount,
    };
};

const actionsToProps = {
    showProfilePopover,
    hideProfilePopover,
    setActiveAccount,
    showDialog: showDeleteAccountDialog,
    setTabValue,
};

export default connect(stateToProps, actionsToProps)(Profile);
