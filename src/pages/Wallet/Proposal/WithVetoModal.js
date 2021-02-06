import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Memo from '../../../containers/Wallet/Proposals/NoWithVeto/Modal/Memo';
import Password from '../../../containers/Wallet/Proposals/NoWithVeto/Modal/Password';
import ButtonNoWithVeto from '../../../containers/Wallet/Proposals/Row/ButtonNoWithVeto';

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
                <ButtonNoWithVeto/>
            </Modal.Body>
        </Modal>
    );
};

export default WithVetoModal;
