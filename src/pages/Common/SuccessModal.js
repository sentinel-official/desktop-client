import React from 'react';
import { Modal } from 'react-bootstrap';
import TextBox from '../../components/TextBox';
import Image from '../../components/Image';
import Success from '../../assets/success.svg';
import './index.css';

const SuccessModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            className="success-modal"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Delegate to"/>
            </Modal.Header>
            <Modal.Body>
                <div className="image-section">
                    <Image alt="Success" className="success-image" src={Success}/>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SuccessModal;
