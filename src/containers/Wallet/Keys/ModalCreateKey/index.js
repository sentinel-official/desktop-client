import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import CreateKey from '../../../CreateKey';
import Mnemonic from '../../../CreateKey/Mnemonic';
import Name from '../../../CreateKey/Name';
import Password from '../../../CreateKey/Password';
import Submit from '../../../CreateKey/Submit';

const ModalCreateKey = () => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={true}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Create Key"
                />
            </ReactModal.Header>
            <ReactModal.Body className="view-key">
                <div className="form-group">
                    <Label
                        className="label"
                        label="Name"
                    />
                    <Name/>
                </div>
                <div className="form-group">
                    <Label
                        className="label"
                        label="Password"
                    />
                    <Password/>
                </div>
                <hr/>
                <div className="form-group">
                    <Label
                        className="label"
                        label="Mnemonic"
                    />
                    <Mnemonic/>
                </div>
                <Submit history={history}/>
            </ReactModal.Body>
        </ReactModal>
    );
};
CreateKey.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};
export default ModalCreateKey;
