import React from 'react';
import { Modal } from 'react-bootstrap';
import Address from '../../../containers/Wallet/Send/Popup/Address';
import Tokens from '../../../containers/Wallet/Send/Popup/Tokens';
import Mnemonic from '../../../containers/Wallet/Send/Popup/Mnemonic';
import Password from '../../../containers/Wallet/Send/Popup/Password';
import Label from '../../../components/Label';
import Send from '../../../containers/Wallet/Send/Popup/Send';
import TextBox from '../../../components/TextBox';
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
                    <Label className="" label="To Address"/>
                    <Address/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Tokens"/>
                    <Tokens/>
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
