import { Button, Popover, Typography } from '@material-ui/core';
import * as PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import variables from '../dummy/variables';
import Icon from './Icon';

const { remote } = window.require('electron');

const Profile = (props) => {
    const createNewAccount = (type) => {
        if (type && type === 'recover') {
            props.setTabValue(1);
        } else {
            props.setTabValue(0);
        }

        props.history.push({
            pathname: '/createAccount',
        });
        props.handleClose();
    };

    const onExitClick = () => {
        const window = remote.getCurrentWindow();
        window.close();
    };

    return (
        <Popover
            anchorEl={props.popover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            className="profile_popover"
            id={props.id}
            open={props.open}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            onClose={props.handleClose}
        >
            {props.accounts.map((account, index) => {
                return (
                    <Typography key={index} className="popover_row user">
                        <Button onClick={() => props.handleActiveAccount(account)}>
                            <span className={
                                props.activeAccount.address === account.address
                                    ? 'blue_circle'
                                    : 'inactive_circle'}/>
                            {account.name}
                        </Button>
                        <span onClick={() => props.deleteAccount(account.name)}>
                            <Icon
                                className="delete"
                                icon="delete"/>
                        </span>
                    </Typography>
                );
            })}
            <Typography className="popover_row row_content2">
                <Button onClick={() => createNewAccount()}>
                    <Icon
                        className="create_new_account"
                        icon="create_new_account"/>
                    {variables[props.lang].create_new_account}
                </Button>
            </Typography>
            <Typography className="popover_row row_content2">
                <Button onClick={() => createNewAccount('recover')}>
                    <Icon
                        className="recover_account"
                        icon="recover_account"/>
                    {variables[props.lang].recover_account}
                </Button>
            </Typography>
            <Typography className="popover_row row_content2">
                <Button
                    className="exit_button"
                    onClick={onExitClick}>
                    {variables[props.lang].exit}
                    <Icon
                        className="exit"
                        icon="exit"/>
                </Button>
            </Typography>
        </Popover>
    );
};

Profile.propTypes = {
    accounts: PropTypes.array.isRequired,
    activeAccount: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    handleActiveAccount: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    setTabValue: PropTypes.func.isRequired,
    id: PropTypes.string,
    popover: PropTypes.any,
};

export default withRouter(Profile);
