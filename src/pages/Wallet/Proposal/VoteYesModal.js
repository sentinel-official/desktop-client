import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import ButtonYes from '../../../containers/Wallet/Proposals/Row/ButtonYes';
import Memo from '../../../containers/Wallet/Proposals/Yes/Popup/Memo';
import Password from '../../../containers/Wallet/Proposals/Yes/Popup/Password';

const VoteYesModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show={true}
            onHide={false}>
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Voting yes"/>
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
                <ButtonYes/>
            </Modal.Body>
        </Modal>
    );
};

export default VoteYesModal;
