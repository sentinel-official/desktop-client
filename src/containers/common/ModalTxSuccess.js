import React from 'react';
import { Modal } from 'react-bootstrap';
import Success from '../../assets/Success.svg';
import Image from '../../components/Image';
import TextBox from '../../components/TextBox';

const ModalTxSuccess = () => {
    return (
        <Modal
            backdrop="static"
            centered={true}
            className="success-modal"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Delegate to"
                />
            </Modal.Header>
            <Modal.Body>
                <div className="image-section">
                    <Image
                        alt="Success"
                        className="success-image"
                        src={Success}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalTxSuccess;
