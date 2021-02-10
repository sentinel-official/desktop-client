import * as PropTypes from 'prop-types';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideTxDelegateModal } from '../../../../actions/transactions/delegate';
import Amount from './Amount';
import Delegate from './Delegate';
import Label from '../../../../components/Label';
import Memo from './Memo';
import Password from './Password';
import React from 'react';
import TextBox from '../../../../components/TextBox';
import ToAddress from './ToAddress';
import ToName from './ToName';

const ModalDelegate = (props) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Delegate to"/>
                <ToName/>
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="To Address"
                    />
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
                <Delegate/>
            </ReactModal.Body>
        </ReactModal>
    );
};

ModalDelegate.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.transactions.delegate.modal,
    };
};

const actionsToProps = {
    onHide: hideTxDelegateModal,
};

export default connect(stateToProps, actionsToProps)(ModalDelegate);
