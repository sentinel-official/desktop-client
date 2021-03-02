import * as PropTypes from 'prop-types';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideKeysListModal } from '../../../../actions/keys';
import Create from './Create';
import List from './List';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ModalKeysList = ({
    show,
    hideKeysListModal,
}) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={show}
            onHide={hideKeysListModal}>
            <ReactModal.Header
                className="keys-header"
                closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Keys"
                />
                <Create/>
            </ReactModal.Header>
            <ReactModal.Body className="view-key">
                <List/>
            </ReactModal.Body>
        </ReactModal>
    );
};

ModalKeysList.propTypes = {
    hideKeysListModal: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.keys.show,
    };
};

const actionsToProps = {
    hideKeysListModal,
};

export default connect(stateToProps, actionsToProps)(ModalKeysList);
