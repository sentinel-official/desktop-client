import React from 'react';
import { Modal } from 'react-bootstrap';
import Address from '../../../containers/Wallet/Validators/RedelegatePopup/Address';
import To from '../../../containers/Wallet/Validators/RedelegatePopup/To';
import Commission from '../../../containers/Wallet/Validators/RedelegatePopup/Commission';
import Amount from '../../../containers/Wallet/Validators/RedelegatePopup/Amount';
import Memo from '../../../containers/Wallet/Validators/RedelegatePopup/Memo';
import Password from '../../../containers/Wallet/Validators/RedelegatePopup/Password';
import Label from '../../../components/Label';
import Redelegate from '../../../containers/Wallet/Validators/RedelegatePopup/Redelegate';
import TextBox from '../../../components/TextBox';
import RedelegateAccount from '../../../containers/Wallet/Validators/RedelegatePopup/RedelegateAccount';
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
                <RedelegateAccount/>
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
                <div className="form-group">
                    <Label className="" label="To Validator"/>
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
