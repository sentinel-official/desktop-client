import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxRedelegateFrom, showTxRedelegateModal } from '../../../../actions/transactions/redelegate';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

const Redelegate = (props) => {
    const onClick = () => {
        props.setFrom({
            value: props.from,
            error: new Error(''),
        });
        props.showModal();
    };

    return (
        <Tooltip title="Redelegate">
            <IconButton
                className="icon-button redelegate-icon-button"
                onClick={onClick}>
                R
            </IconButton>
        </Tooltip>
    );
};

Redelegate.propTypes = {
    from: PropTypes.string.isRequired,
    setFrom: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
};

const actionsToProps = {
    showModal: showTxRedelegateModal,
    setFrom: setTxRedelegateFrom,
};

export default connect(null, actionsToProps)(Redelegate);
