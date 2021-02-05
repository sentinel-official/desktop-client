import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Amount from '../../../containers/Wallet/Validators/ModalDelegate/Amount';
import Delegate from '../../../containers/Wallet/Validators/ModalDelegate/Delegate';
import Password from '../../../containers/Wallet/Validators/ModalDelegate/Password';
import ToAddress from '../../../containers/Wallet/Validators/ModalDelegate/ToAddress';
import ToCommissionRate from '../../../containers/Wallet/Validators/ModalDelegate/ToCommissionRate';
import Amount from '../../../containers/Wallet/Validators/ModalDelegate/Tokens';
import ToName from '../../../containers/Wallet/Validators/ModalDelegate/ToName';
import './index.css';

const DelegateModal = () => {
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
                <TextBox className="modal-title" value="Delegate to"/>
                <ToName/>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-item">
                    <Label className="" label="Operator Address"/>
                    <ToAddress/>
                </div>
                <div className="flex-item">
                    <Label className="" label="CommissionRate Rate"/>
                    <ToCommissionRate/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Amount"/>
                    <Tokens/>
                </div>
                <div className="form-group">
                    <Label className="" label="Amount"/>
                    <Amount/>
                </div>
                <div className="form-group">
                    <Label className="" label="Password"/>
                    <Password/>
                </div>
                <Delegate/>
            </Modal.Body>
        </Modal>
    );
};

export default DelegateModal;
