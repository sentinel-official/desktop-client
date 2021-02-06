import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Amount from '../../../containers/Wallet/Send/Modal/Amount';
import Fee from '../../../containers/Wallet/Withdraw/Modal/Fee';
import FromAddress from '../../../containers/Wallet/Withdraw/Modal/FromAddress';
import FromName from '../../../containers/Wallet/Withdraw/Modal/FromName';
import Password from '../../../containers/Wallet/Withdraw/Modal/Password';
import Withdraw from '../../../containers/Wallet/Withdraw/Modal/Withdraw';
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
                <FromName/>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-item">
                    <Label className="" label="FromAddress"/>
                    <FromAddress/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Amount"/>
                    <Amount/>
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
