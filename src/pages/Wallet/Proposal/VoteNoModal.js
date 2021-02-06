import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Memo from '../../../containers/Wallet/Proposals/No/Popup/Memo';
import Password from '../../../containers/Wallet/Proposals/No/Popup/Password';
import ButtonNo from '../../../containers/Wallet/Proposals/Row/ButtonNo';

const VoteNoModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="No Voting yes"/>
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
                <ButtonNo/>
            </Modal.Body>
        </Modal>
    );
};

export default VoteNoModal;
