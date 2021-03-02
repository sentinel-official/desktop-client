import * as PropTypes from 'prop-types';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideKeysInfoModal } from '../../../../actions/keys';
import Address from '../../../KeyInfo/Address';
import AddressCopy from '../../../KeyInfo/AddressCopy';
import Mnemonic from '../../../KeyInfo/Mnemonic';
import MnemonicDownload from '../../../KeyInfo/MnemonicDownload';
import PublicKey from '../../../KeyInfo/PublicKey';
import PublicKeyCopy from '../../../KeyInfo/PublicKeyCopy';
import React from 'react';
import TextBox from '../../../../components/TextBox';

const ModalInfo = ({
    show,
    hideKeysInfoModal,
}) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={show}
            onHide={hideKeysInfoModal}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Key Details"
                />
            </ReactModal.Header>
            <ReactModal.Body className="view-key">
                <div className="label-icon">
                    <TextBox
                        className="label"
                        value="ADDRESS"
                    />
                    <AddressCopy/>
                </div>
                <Address/>
                <div className="label-icon">
                    <TextBox
                        className="label"
                        value="PUBLIC KEY"
                    />
                    <PublicKeyCopy/>
                </div>
                <PublicKey/>
                <div className="label-icon">
                    <TextBox
                        className="label"
                        value="MNEMONIC"
                    />
                    <MnemonicDownload/>
                </div>
                <Mnemonic/>
                <TextBox
                    className="seed-note"
                    value="Note: Copy your keys to a secure location. Remember, we don't store any of your keys in our databases."
                />
            </ReactModal.Body>
        </ReactModal>
    );
};

ModalInfo.propTypes = {
    hideKeysInfoModal: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.keys.post.info.show,
    };
};

const actionsToProps = {
    hideKeysInfoModal,
};

export default connect(stateToProps, actionsToProps)(ModalInfo);
