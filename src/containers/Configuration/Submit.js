import * as PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { putConfiguration } from '../../actions/configuration';
import Button from '../../components/Button';
import {
    ValidateBroadcastMode,
    ValidateFees,
    ValidateGas,
    ValidateGasAdjustment,
    ValidateGasPrices,
    ValidateID,
    ValidateRPCAddress,
    ValidateSimulateAndExecute,
    ValidateTrustNode,
} from './_validation';

const Submit = (props) => {
    const onClick = () => {
        props.onClick((error) => {
            if (error) {
                return;
            }

            props.history.push('/dashboard/wallet');
        });
    };

    const disabled = (
        ValidateBroadcastMode(props.chain.broadcastMode.value).message !== '' ||
        ValidateFees(props.chain.fees.value).message !== '' ||
        ValidateGasAdjustment(props.chain.gasAdjustment.value).message !== '' ||
        ValidateGasPrices(props.chain.gasPrices.value).message !== '' ||
        ValidateGas(props.chain.gas.value).message !== '' ||
        ValidateID(props.chain.id.value).message !== '' ||
        ValidateRPCAddress(props.chain.RPCAddress.value).message !== '' ||
        ValidateSimulateAndExecute(props.chain.simulateAndExecute.value).message !== '' ||
        ValidateTrustNode(props.chain.trustNode.value).message !== ''
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
        fees: PropTypes.shape({
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
        trustNode: PropTypes.shape({
            value: PropTypes.bool.isRequired,
            error: PropTypes.shape({
                message: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    inProgress: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        chain: {
            broadcastMode: state.configuration.chain.broadcastMode,
            fees: state.configuration.chain.fees,
            gasAdjustment: state.configuration.chain.gasAdjustment,
            gasPrices: state.configuration.chain.gasPrices,
            gas: state.configuration.chain.gas,
            id: state.configuration.chain.id,
            RPCAddress: state.configuration.chain.RPCAddress,
            simulateAndExecute: state.configuration.chain.simulateAndExecute,
            trustNode: state.configuration.chain.trustNode,
        },
        inProgress: state.configuration.put.inProgress,
    };
};

const actionsToProps = {
    onClick: putConfiguration,
};

export default connect(stateToProps, actionsToProps)(Submit);
