import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Amount from './Amount';
import FromAddress from './FromAddress';
import FromName from './FromName';
import Memo from './Memo';
import Password from './Password';
import Redelegate from './Redelegate';
import ToAddress from './ToAddress';

const RedelegateModal = () => {
    return (
        <ReactModal
            backdrop="static"
            centered={true}
            className="Redelegate-modal"
            keyboard={false}
            show={true}
            onHide={false}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Redelegate From"/>
                <FromName/>
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="From Address"
                    />
                    <FromAddress/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="To Address"/>
                    <ToAddress/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Amount"
                    />
                    <Amount/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Memo"
                    />
                    <Memo/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Password"
                    />
                    <Password/>
                </div>
                <Redelegate/>
            </ReactModal.Body>
        </ReactModal>
    );
};

export default RedelegateModal;
