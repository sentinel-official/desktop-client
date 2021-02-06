import * as PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { hideConfigurationModal } from '../../actions/configuration';
import Label from '../../components/Label';
import TextBox from '../../components/TextBox';
import Tooltip from '../../components/Tooltip/Tooltip';
import BroadcastMode from '../Configuration/BroadcastMode';
import ChainID from '../Configuration/ChainID';
import Fee from '../Configuration/Fees';
import Gas from '../Configuration/Gas';
import GasAdjustment from '../Configuration/GasAdjustment';
import GasPrices from '../Configuration/GasPrices';
import RPCAddress from '../Configuration/RPCAddress';
import SimulateAndExecute from '../Configuration/SimulateAndExecute';
import Submit from '../Configuration/Submit';
import TrustNode from '../Configuration/TrustNode';

const ModalConfiguration = (props) => {
    return (
        <Modal
            animation={false}
            backdrop="static"
            centered={true}
            keyboard={false}
            show={props.show}
            onHide={props.onHide}>
            <Modal.Header closeButton={true}>
                <TextBox
                    className="modal-title"
                    value="Configuration"
                />
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Broadcast Mode"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <BroadcastMode/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Fee"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <Fee/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Gas"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <Gas/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Gas Adjustment"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <GasAdjustment/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Gas Prices"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <GasPrices/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Chain ID"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <ChainID/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Simulate And Execute"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <SimulateAndExecute/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Trust Node"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <TrustNode/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="RPC Address"
                                />
                                <Tooltip
                                    icon="tooltip"
                                    value="Help"
                                />
                            </div>
                            <RPCAddress/>
                        </div>
                    </div>
                </div>
                <Submit/>
            </Modal.Body>
        </Modal>
    );
};

ModalConfiguration.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        show: state.configuration.modal,
    };
};

const actionsToProps = {
    onHide: hideConfigurationModal,
};

export default connect(stateToProps, actionsToProps)(ModalConfiguration);
