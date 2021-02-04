import React from 'react';
import { Modal } from 'react-bootstrap';
import Memo from '../../../containers/Wallet/Proposals/VotingYes/Popup/Memo';
import Password from '../../../containers/Wallet/Proposals/VotingYes/Popup/Password';
import ButtonYes from '../../../containers/Wallet/Proposals/VotingYes/ButtonYes';
import TextBox from '../../../components/TextBox';
import Label from '../../../components/Label';

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
