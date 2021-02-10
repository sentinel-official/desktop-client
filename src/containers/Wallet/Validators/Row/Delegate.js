import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxDelegateTo, showTxDelegateModal } from '../../../../actions/transactions/delegate';
import Button from '../../../../components/Button';
import React from 'react';

const Delegate = (props) => {
    const onClick = () => {
        props.setTo({
            value: props.to,
            error: new Error(''),
        });
        props.showModal();
    };

    return (
        <Button
            className="delegate-button"
            disabled={false}
            inProgress={false}
            value="Delegate"
            onClick={onClick}
        />
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
