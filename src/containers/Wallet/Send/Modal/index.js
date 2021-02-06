import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Address from './Address';
import Amount from './Amount';
import './index.css';
import Memo from './Memo';
import Password from './Password';
import Send from './Send';

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
                    value="Sending Amount"
                />
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="Address Address"
                    />
                    <Address/>
                </div>
                <div className="flex-item">
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
                <Send/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default Modal;
