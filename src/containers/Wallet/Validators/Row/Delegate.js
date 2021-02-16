import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxDelegateTo, showTxDelegateModal } from '../../../../actions/transactions/delegate';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Delegate = (props) => {
    const onClick = () => {
        props.setTo({
            value: props.to,
            error: new Error(''),
        });
        props.showModal();
    };

    return (
        <Tooltip title="Delegate">
            <IconButton
                className="icon-button delegate-icon-button"
                onClick={onClick}>
                D
            </IconButton>
        </Tooltip>
    );
};

Delegate.propTypes = {
    setTo: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
};

const actionsToProps = {
    showModal: showTxDelegateModal,
    setTo: setTxDelegateTo,
};

export default connect(null, actionsToProps)(Delegate);
