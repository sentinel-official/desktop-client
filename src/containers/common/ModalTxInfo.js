import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setTxInfoModalHide } from '../../actions/transactions/info';
import Failure from '../../assets/Failure.svg';
import Success from '../../assets/Success.svg';
import Image from '../../components/Image';
import TextBox from '../../components/TextBox';

const ModalTxInfo = (props) => {
    const { code } = props.error;

    return (
        <Modal
            animation={false}
            backdrop="static"
            centered={true}
            className={code === 0 ? 'success-modal' : 'failure-modal'}
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <Modal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value={code === 0 ? 'Success' : 'Failure'}
                />
            </Modal.Header>
            <Modal.Body>
                <div className="image-section">
                    <Image
                        alt={code === 0 ? 'success' : 'failure'}
                        className={code === 0 ? 'success-image' : 'failure-image'}
                        src={code === 0 ? Success : Failure}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

ModalTxInfo.propTypes = {
    error: PropTypes.shape({
        code: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
    show: PropTypes.bool.isRequired,
    txHash: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        error: state.transactions.info.error,
        show: state.transactions.info.modal,
        txHash: state.transactions.info.txHash,
    };
};

const actionsToProps = {
    onHide: setTxInfoModalHide,
};

export default connect(stateToProps, actionsToProps)(ModalTxInfo);
