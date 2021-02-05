import React from 'react';
import { Modal } from 'react-bootstrap';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Tooltip from '../../../components/Tooltip/Tooltip';
import BroadcastMode from '../../../containers/Configuration/BroadcastMode';
import Fee from '../../../containers/Configuration/Fee';
import Gas from '../../../containers/Configuration/Gas';
import GasAdjustment from '../../../containers/Configuration/GasAdjustment';
import GasPrices from '../../../containers/Configuration/GasPrices';
import ChainID from '../../../containers/Configuration/ChainID';
import SimulateAndExecute from '../../../containers/Configuration/SimulateAndExecute';
import TrustNode from '../../../containers/Configuration/TrustNode';
import RPCAddress from '../../../containers/Configuration/RPCAddress';
import Submit from '../../../containers/Configuration/Submit';

const SettingModal = () => {
    return (
        <Modal
            centered
            backdrop="static"
            keyboard={false}
            show={true}
            onHide={false}
        >
            <Modal.Header closeButton>
                <TextBox className="modal-title" value="Configure Settings"/>
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
                                <Tooltip value="Help"/>
                            </div>
                            <BroadcastMode/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Fee"
                                />
                                <Tooltip value="Help"/>
                            </div>
                            <Fee/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Gas"
                                />
                                <Tooltip value="Help"/>
                            </div>
                            <Gas/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Gas Adjustment"
                                />
                                <Tooltip value="Help"/>
                            </div>
                            <GasAdjustment/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Gas Price"
                                />
                                <Tooltip value="Help"/>
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
                                <Tooltip value="Help"/>
                            </div>
                            <ChainID/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Simulate And Execute"
                                />
                                <Tooltip value="Help"/>
                            </div>
                            <SimulateAndExecute/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="Trust Node"
                                />
                                <Tooltip value="Help"/>
                            </div>
                            <TrustNode/>
                        </div>
                        <div className="form-group">
                            <div className="label-icon">
                                <Label
                                    className="label"
                                    label="RPC Address"
                                />
                                <Tooltip value="Help"/>
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

export default SettingModal;
