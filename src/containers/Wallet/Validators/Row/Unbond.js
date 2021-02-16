import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxUnbondFrom, showTxUnbondModal } from '../../../../actions/transactions/unbond';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Unbond = (props) => {
    const onClick = () => {
        props.setFrom({
            value: props.from,
            error: new Error(''),
        });
        props.showModal();
    };

    return (
        <Tooltip title="Unbond">
            <IconButton
                className="icon-button unbond-icon-button"
                onClick={onClick}>
                U
            </IconButton>
        </Tooltip>
    );
};

Unbond.propTypes = {
    from: PropTypes.string.isRequired,
    setFrom: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
};

const actionsToProps = {
    showModal: showTxUnbondModal,
    setFrom: setTxUnbondFrom,
};

export default connect(null, actionsToProps)(Unbond);
