import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Memo from './Memo';
import Password from './Password';
import Vote from './Vote';

const Modal = () => {
    return (
        <ReactModal
            backdrop="static"
            centered={true}
            keyboard={false}
            show={true}
            onHide={false}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Voting abstain"
                />
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="form-group">
                    <Label
                        className=""
                        label="Memo"
                    />
                    <Memo/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Password"
                    />
                    <Password/>
                </div>
                <Vote/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default Modal;
