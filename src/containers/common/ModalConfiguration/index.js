import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getConfiguration, hideConfigurationModal } from '../../../actions/configuration';
import Label from '../../../components/Label';
import TextBox from '../../../components/TextBox';
import Tooltip from '../../../components/Tooltip/Tooltip';
import BroadcastMode from '../../Configuration/BroadcastMode';
import ChainID from '../../Configuration/ChainID';
import Fee from '../../Configuration/Fees';
import Gas from '../../Configuration/Gas';
import GasAdjustment from '../../Configuration/GasAdjustment';
import GasPrices from '../../Configuration/GasPrices';
import RPCAddress from '../../Configuration/RPCAddress';
import SimulateAndExecute from '../../Configuration/SimulateAndExecute';
import TrustNode from '../../Configuration/TrustNode';
import Submit from './Submit';

const ModalConfiguration = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (props.show === false) {
            setLoading(true);
            return;
        }

        props.getConfiguration(props.history, (error) => {
            if (error) {
                return;
            }

            setLoading(false);
        });
    }, [props.show]);

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
                {
                    loading
                        ? <span>Loading</span>
                        : <>
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
                            <Submit hideConfigurationModal={props.onHide}/>
                        </>
                }
            </Modal.Body>
        </Modal>
    );
};

ModalConfiguration.propTypes = {
    getConfiguration: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
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
    getConfiguration: getConfiguration,
};

export default connect(stateToProps, actionsToProps)(ModalConfiguration);
