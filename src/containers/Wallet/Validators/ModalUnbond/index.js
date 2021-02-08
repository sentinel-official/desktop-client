import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideTxUnbondModal } from '../../../../actions/transactions/unbond';
import Label from '../../../../components/Label';
import TextBox from '../../../../components/TextBox';
import Amount from './Amount';
import FromAddress from './FromAddress';
import FromName from './FromName';
import Memo from './Memo';
import Password from './Password';
import Unbond from './Unbond';

const ModalUnbond = (props) => {
    return (
        <ReactModal
            animation={false}
            backdrop="static"
            centered={true}
            className="withdraw-modal"
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <ReactModal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Unbond From"/>
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
                <Unbond/>
            </ReactModal.Body>
        </ReactModal>
    );
};

ModalUnbond.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.transactions.unbond.modal,
    };
};

const actionsToProps = {
    onHide: hideTxUnbondModal,
};

export default connect(stateToProps, actionsToProps)(ModalUnbond);
