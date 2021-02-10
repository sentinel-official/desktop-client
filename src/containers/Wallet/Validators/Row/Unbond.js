import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTxUnbondFrom, showTxUnbondModal } from '../../../../actions/transactions/unbond';
import Button from '../../../../components/Button';
import React from 'react';

const Unbond = (props) => {
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
            value="Unbond"
            onClick={onClick}
        />
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
