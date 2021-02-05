import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Address from '../../../containers/Wallet/Send/Modal/Address';
import Amount from '../../../containers/Wallet/Send/Modal/Amount';
import Mnemonic from '../../../containers/Wallet/Send/Modal/Mnemonic';
import Password from '../../../containers/Wallet/Send/Modal/Password';
import Send from '../../../containers/Wallet/Send/Modal/Send';
import './index.css';

const SendModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show={true}
            onHide={false}
        >
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="SENDING TOKENS to"/>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-item">
                    <Label className="" label="Address Address"/>
                    <Address/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Amount"/>
                    <Amount/>
                </div>
                <div className="form-group">
                    <Label className="" label="Memo"/>
                    <Mnemonic/>
                </div>
                <div className="form-group">
                    <Label className="" label="Password"/>
                    <Password/>
                </div>
                <Send/>
            </Modal.Body>
        </Modal>
    );
};

export default SendModal;
