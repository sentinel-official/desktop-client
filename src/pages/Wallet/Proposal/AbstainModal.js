import React from 'react';
import { Modal } from 'react-bootstrap';
import Memo from '../../../containers/Wallet/Proposals/Abstain/Popup/Memo';
import Password from '../../../containers/Wallet/Proposals/Abstain/Popup/Password';
import ButtonAbstain from '../../../containers/Wallet/Proposals/Abstain/ButtonAbstain';
import TextBox from '../../../components/TextBox';
import Label from '../../../components/Label';

const AbstainModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Voting abstain"/>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <Label className="" label="Memo"/>
                    <Memo/>
                </div>
                <div className="form-group">
                    <Label className="" label="Password"/>
                    <Password/>
                </div>
                <ButtonAbstain/>
            </Modal.Body>
        </Modal>
    );
};

export default AbstainModal;
