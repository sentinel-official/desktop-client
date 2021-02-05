import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Amount from '../../../containers/Wallet/Validators/ModalRedelegate/Amount';
import FromName from '../../../containers/Wallet/Validators/ModalRedelegate/FromName';
import Memo from '../../../containers/Wallet/Validators/ModalRedelegate/Memo';
import Password from '../../../containers/Wallet/Validators/ModalRedelegate/Password';
import Redelegate from '../../../containers/Wallet/Validators/ModalRedelegate/Redelegate';
import Address from '../../../containers/Wallet/Validators/ModalRedelegate/ToAddress';
import './index.css';

const RedelegateModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            className="Redelegate-modal"
            keyboard={false}
            show={true}
            onHide={false}
        >
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Re-Delegate to"/>
                <FromName/>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-item">
                    <Label className="" label="Operator Address"/>
                    <Address/>
                </div>
                <div className="flex-item">
                    <Label className="" label="CommissionRate Rate"/>
                    <Commission/>
                </div>
                <div className="form-group">
                    <Label className="" label="Address Validator"/>
                    <To/>
                </div>
                <div className="form-group">
                    <Label className="" label="Amount"/>
                    <Amount/>
                </div>
                <div className="form-group">
                    <Label className="" label="Memo"/>
                    <Memo/>
                </div>
                <div className="form-group">
                    <Label className="" label="Password"/>
                    <Password/>
                </div>
                <Redelegate/>
            </Modal.Body>
        </Modal>
    );
};

export default RedelegateModal;
