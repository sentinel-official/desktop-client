import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Amount from './Amount';
import Delegate from './Delegate';
import Memo from './Memo';
import Password from './Password';
import ToAddress from './ToAddress';
import ToName from './ToName';

const Modal = () => {
    return (
        <ReactModal
            backdrop="static"
            centered={true}
            className="withdraw-modal"
            keyboard={false}
            show={true}
            onHide={false}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Delegate to"/>
                <ToName/>
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="To Address"
                    />
                    <ToAddress/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Amount"
                    />
                    <Amount/>
                </div>
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
                <Delegate/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default Modal;
