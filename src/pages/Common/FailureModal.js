import React from 'react';
import { Modal } from 'react-bootstrap';
import TextBox from '../../components/TextBox';
import Image from '../../components/Image';
import failure from '../../assets/failure.svg';
import './index.css';

const FailureModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            className="failure-modal"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Delegate to"/>
            </Modal.Header>
            <Modal.Body>
                <div className="image-section">
                    <Image alt="failure" className="failure-image" src={failure}/>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default FailureModal;
