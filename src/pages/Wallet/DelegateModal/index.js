import React from 'react';
import { Modal } from 'react-bootstrap';
import Address from '../../../containers/Wallet/Validators/DelegatePopup/Address';
import Tokens from '../../../containers/Wallet/Validators/DelegatePopup/Tokens';
import Commission from '../../../containers/Wallet/Validators/DelegatePopup/Commission';
import Amount from '../../../containers/Wallet/Validators/DelegatePopup/Amount';
import Password from '../../../containers/Wallet/Validators/DelegatePopup/Password';
import Label from '../../../components/Label';
import Delegate from '../../../containers/Wallet/Validators/DelegatePopup/Delegate';
import TextBox from '../../../components/TextBox';
import DelegateAccount from '../../../containers/Wallet/Validators/DelegatePopup/DelegateAccount';
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
                <DelegateAccount/>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-item">
                    <Label className="" label="Operator Address"/>
                    <Address/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Commission Rate"/>
                    <Commission/>
                </div>
                <div className="flex-item">
                    <Label className="" label="Tokens"/>
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
