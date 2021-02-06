import React from 'react';
import { Modal } from 'react-bootstrap';
import Failure from '../../assets/Failure.svg';
import Image from '../../components/Image';
import TextBox from '../../components/TextBox';

const ModalTxFailure = () => {
    return (
        <Modal
            backdrop="static"
            centered={true}
            className="failure-modal"
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
                        alt="failure"
                        className="failure-image"
                        src={Failure}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalTxFailure;
