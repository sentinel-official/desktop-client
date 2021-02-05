import React from 'react';
import { Modal } from 'react-bootstrap';
import FromAddress from '../../../containers/Wallet/WithDraw/Popup/FromAddress';
import Tokens from '../../../containers/Wallet/Send/Popup/Tokens';
import Fee from '../../../containers/Wallet/WithDraw/Popup/Fee';
import Password from '../../../containers/Wallet/WithDraw/Popup/Password';
import Label from '../../../components/Label';
import Withdraw from '../../../containers/Wallet/WithDraw/Popup/Withdraw';
import TextBox from '../../../components/TextBox';
import FromAccount from '../../../containers/Wallet/WithDraw/Popup/FromAccount';
import './index.css';

const WithDrawModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            className="withdraw-modal"
            keyboard={false}
            show={true}
            onHide={false}
        >
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="WITHDRAWING FROM"/>
                <FromAccount/>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-item">
                    <Label className="" label="FromAddress"/>
                    <FromAddress/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Tokens"/>
                    <Tokens/>
                </div>
                <div className="form-group">
                    <Label className="" label="Fee"/>
                    <Fee/>
                </div>
                <div className="form-group">
                    <Label className="" label="Password"/>
                    <Password/>
                </div>
                <Withdraw/>
            </Modal.Body>
        </Modal>
    );
};

export default WithDrawModal;
