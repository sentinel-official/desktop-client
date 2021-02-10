import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxRedelegateFrom, showTxRedelegateModal } from '../../../../actions/transactions/redelegate';
import Button from '../../../../components/Button';
import React from 'react';

const Redelegate = (props) => {
    const onClick = () => {
        props.setFrom({
            value: props.from,
            error: new Error(''),
        });
        props.showModal();
    };

    return (
        <Button
            className="delegate-button"
            disabled={false}
            inProgress={false}
            value="Redelegate"
            onClick={onClick}
        />
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
