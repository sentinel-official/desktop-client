import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccount } from '../../actions/account';
import { getCoingecko } from '../../actions/coingecko';
import { getDelegations } from '../../actions/delegations';
import { getValidators } from '../../actions/validators';
import Async from 'async';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';

const Refresh = (props) => {
    const [inProgress, setInProgress] = useState(false);

    const onClick = () => {
        if (inProgress) {
            return;
        }

        setInProgress(true);
        Async.waterfall([
            (next1) => props.getAccount(next1),
            (next1) => {
                Async.parallel([
                    (next2) => props.getCoingecko(next2),
                    (next2) => props.getValidators(next2),
                    (next2) => props.getDelegations(next2),
                ], next1);
            },
        ], () => {
            setInProgress(false);
        });
        //
        // setInProgress(true);
        // Async.parallel([
        //     (next) => props.getAccount(next),
        //     (next) => props.getCoingecko(next),
        //     (next) => props.getValidators(next),
        //     (next) => props.getDelegations(next),
        // ], () => {
        //     setInProgress(false);
        // });
    };

    return (
        <IconButton
            className="refresh-button"
            onClick={onClick}>
            <RefreshIcon/>
        </IconButton>
    );
};

Refresh.propTypes = {
    getAccount: PropTypes.func.isRequired,
    getCoingecko: PropTypes.func.isRequired,
    getDelegations: PropTypes.func.isRequired,
    getValidators: PropTypes.func.isRequired,
};

const actionsToProps = {
    getAccount,
    getCoingecko,
    getValidators,
    getDelegations,
};

export default connect(null, actionsToProps)(Refresh);
