import * as PropTypes from 'prop-types';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideKeysCreateModal } from '../../../../actions/keys';
import Label from '../../../../components/Label';
import Mnemonic from '../../../CreateKey/Mnemonic';
import Name from '../../../CreateKey/Name';
import Password from '../../../CreateKey/Password';
import React from 'react';
import Submit from './Submit';
import TextBox from '../../../../components/TextBox';
import ViewPassword from '../../../CreateKey/ViewPassword';

const ModalCreate = ({
    show,
    hideKeysCreateModal,
}) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={show}
            onHide={hideKeysCreateModal}>
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
                        label="Name *"
                    />
                    <Name/>
                </div>
                <div className="password-box">
                    <div className="form-group">
                        <Label
                            className=""
                            label="Password *"
                        />
                        <Password/>
                    </div>
                    <ViewPassword/>
                </div>
                <hr/>
                <div className="form-group">
                    <Label
                        className="label"
                        label="Mnemonic (optional)"
                    />
                    <Mnemonic/>
                </div>
                <Submit/>
            </ReactModal.Body>
        </ReactModal>
    );
};

ModalCreate.propTypes = {
    hideKeysCreateModal: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.keys.post.show,
    };
};

const actionsToProps = {
    hideKeysCreateModal,
};

export default connect(stateToProps, actionsToProps)(ModalCreate);
