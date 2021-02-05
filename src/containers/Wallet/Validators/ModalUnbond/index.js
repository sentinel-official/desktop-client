import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Amount from './Amount';
import FromAddress from './FromAddress';
import FromName from './FromName';
import Memo from './Memo';
import Password from './Password';
import Unbond from './Unbond';

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
                    value="Unbond From"/>
                <FromName/>
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="From Address"
                    />
                    <FromAddress/>
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
                <Unbond/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default Modal;
