import * as PropTypes from 'prop-types';
import {
    ValidateBroadcastMode,
    ValidateGas,
    ValidateGasAdjustment,
    ValidateGasPrices,
    ValidateID,
    ValidateRPCAddress,
    ValidateSimulateAndExecute,
} from '../../Configuration/_validation';
import { connect } from 'react-redux';
import { hideConfigurationModal, putConfiguration } from '../../../actions/configuration';
import Button from '../../../components/Button';
import React from 'react';

const Submit = (props) => {
    const onClick = () => {
        if (props.inProgress) {
            return;
        }

        props.putConfiguration((error) => {
            if (error) {
                return;
            }

            props.hideConfigurationModal();
        });
    };

    const disabled = (
        ValidateBroadcastMode(props.chain.broadcastMode.value).message !== '' ||
        ValidateGasAdjustment(props.chain.gasAdjustment.value).message !== '' ||
        ValidateGasPrices(props.chain.gasPrices.value).message !== '' ||
        ValidateGas(props.chain.gas.value).message !== '' ||
        ValidateID(props.chain.id.value).message !== '' ||
        ValidateRPCAddress(props.chain.RPCAddress.value).message !== '' ||
        ValidateSimulateAndExecute(props.chain.simulateAndExecute.value).message !== ''
    );

    return (
        <Button
            className="btn button-primary"
            disabled={disabled}
            inProgress={props.inProgress}
            type="button"
            value="Save"
            onClick={onClick}
        />
    );
};

Submit.propTypes = {
    chain: PropTypes.shape({
        broadcastMode: PropTypes.shape({
            value: PropTypes.string.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        gasAdjustment: PropTypes.shape({
            value: PropTypes.number.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        gasPrices: PropTypes.shape({
            value: PropTypes.string.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        gas: PropTypes.shape({
            value: PropTypes.number.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        id: PropTypes.shape({
            value: PropTypes.string.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        RPCAddress: PropTypes.shape({
            value: PropTypes.string.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        simulateAndExecute: PropTypes.shape({
            value: PropTypes.bool.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    hideConfigurationModal: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    putConfiguration: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chain: {
            broadcastMode: state.configuration.chain.broadcastMode,
            gasAdjustment: state.configuration.chain.gasAdjustment,
            gasPrices: state.configuration.chain.gasPrices,
            gas: state.configuration.chain.gas,
            id: state.configuration.chain.id,
            RPCAddress: state.configuration.chain.RPCAddress,
            simulateAndExecute: state.configuration.chain.simulateAndExecute,
        },
        inProgress: state.configuration.put.inProgress,
    };
};

const actionsToProps = {
    putConfiguration,
    hideConfigurationModal,
};

export default connect(stateToProps, actionsToProps)(Submit);
