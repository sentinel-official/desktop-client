import * as PropTypes from 'prop-types';
import { Modal as ReactModal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideTxWithdrawModal } from '../../../../actions/transactions/withdraw';
import AccountPassword from '../../../common/AccountPassword';
import AccountPasswordView from '../../../common/AccountPasswordView';
import FromAddress from './FromAddress';
import FromName from './FromName';
import Label from '../../../../components/Label';
import Memo from './Memo';
import React from 'react';
import TextBox from '../../../../components/TextBox';
import Withdraw from './Withdraw';

const Modal = (props) => {
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
                    value="Withdraw Rewards"
                />
                <FromName/>
            </ReactModal.Header>
            <ReactModal.Body>
                <div className="flex-item">
                    <Label
                        className=""
                        label="From"
                    />
                    <FromAddress/>
                </div>
                <div className="form-group">
                    <Label
                        className=""
                        label="Memo"
                    />
                    <Memo/>
                </div>
                <div className="password-box">
                    <div className="form-group">
                        <Label
                            className=""
                            label="Password"
                        />
                        <AccountPassword/>
                    </div>
                    <AccountPasswordView/>
                </div>
                <Withdraw/>
            </ReactModal.Body>
        </ReactModal>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.transactions.withdraw.modal,
    };
};

const actionsToProps = {
    onHide: hideTxWithdrawModal,
};

export default connect(stateToProps, actionsToProps)(Modal);
