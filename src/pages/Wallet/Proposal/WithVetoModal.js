import React from 'react';
import { Modal } from 'react-bootstrap';
import Memo from '../../../containers/Wallet/Proposals/NowithVeto/Popup/Memo';
import Password from '../../../containers/Wallet/Proposals/NowithVeto/Popup/Password';
import ButtonWithVeto from '../../../containers/Wallet/Proposals/NowithVeto/ButtonWithVeto';
import TextBox from '../../../components/TextBox';
import Label from '../../../components/Label';

const WithVetoModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Voting no_with_veto"/>
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
                <ButtonWithVeto/>
            </Modal.Body>
        </Modal>
    );
};

export default WithVetoModal;
