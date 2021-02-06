import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import ButtonAbstain from '../../../containers/Wallet/Proposals/ButtonAbstain';
import Memo from '../../../containers/Wallet/Proposals/Modal/Memo';
import Password from '../../../containers/Wallet/Proposals/Modal/Password';

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
