import { Modal as ReactModal } from 'react-bootstrap';
import AddKey from './AddKey';
import Keys from './Keys';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ModalViewKeys = () => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={true}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Keys"
                />
            </ReactModal.Header>
            <ReactModal.Body className="view-key">
                <AddKey/>
                <hr/>
                <Keys/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default ModalViewKeys;
